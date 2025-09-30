'use server';
import { sendToPrinter, encoder } from './printer';

const MAX_LINE_LENGTH = 48;

function sliceTextToLines(text: string, maxLength: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 > maxLength) {
      if (currentLine.length > 0) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        for (let i = 0; i < word.length; i += maxLength) {
          lines.push(word.slice(i, i + maxLength));
        }
      }
    } else {
      currentLine += (currentLine.length > 0 ? ' ' : '') + word;
    }
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
}

export async function printPlaintext(_prevState: any, data: FormData) {
  const message = data.get('message') as string;
  if (!message) {
    return {
      body: 'No message provided'
    };
  }
  console.log('Printing message', message);
  
  // Slice the message into appropriate lines
  const lines = sliceTextToLines(message, MAX_LINE_LENGTH);
  
  // Start with encoder initialization
  let encoderChain = encoder.initialize();
  
  // Add each line as plaintext
  lines.forEach(line => {
    encoderChain = encoderChain.bold(true).text(line).newline();
  });
  
  // Add an extra newline for spacing
  const encodedMessage = encoderChain.newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .newline()
    .cut('full')
    .encode();
  
  await sendToPrinter(encodedMessage);

  return {
    body: `Printed message: ${message}`,
    lines: lines.length
  };
}
