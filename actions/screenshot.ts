'use server';
import { chromium } from 'playwright';
import { client } from '../lib/printer';
import EscPosEncoder from 'esc-pos-encoder';
import { loadImage } from 'canvas';

const encoder = new EscPosEncoder();

// export async function takeScreenshot(data: FormData) {
//   console.log('Taking screenshot');
//   const result = encoder.initialize().text('Taking screenshot').newline().encode();
//   client.write(result);
//   // }

export async function takeScreenshot(formData: FormData) {
  const path = formData.get('path')?.toString() ?? 'test';
  const searchParams = formData.get('searchParams')?.toString() ?? '';
  console.log(formData);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log(`Created browser and page`);
  const url = `http://localhost:3000/${path}${
    searchParams ? `?${new URLSearchParams([['data', searchParams]])}` : ''
  }`;
  console.log(`Navigating to ${url}`);
  await page.goto(url);

  const ss = (await page.locator('.screenshot-body').screenshot()).toString(
    'base64url'
  );
  console.log('Screenshot taken');
  const base64URL = `data:image/png;base64,${ss}`;
  await browser.close();

  const image = await loadImage(base64URL);
  console.log(image.naturalWidth, image.naturalHeight);
  const width = image.naturalWidth;
  const aspectRatio = image.naturalWidth / image.naturalHeight;
  const height = Math.floor(width / aspectRatio / 8) * 8;
  image.height = height;
  let result = encoder
    .initialize()
    .image(image, image.width, image.height, 'threshold')
    .newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .cut()
    .encode();
  // Encode the image
  console.log(`Wrtiting to printer...`);
  client?.write(result);
  return;
}
