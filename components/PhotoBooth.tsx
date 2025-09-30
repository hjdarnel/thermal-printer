'use client';

import { useEffect, useRef, useState } from 'react';
import EscPosEncoder from 'esc-pos-encoder';
import {  printImage } from '@/actions/print';
const encoder = new EscPosEncoder();

async function useWebcam() {
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  video.srcObject = stream;
  video.play();

  return { video, canvas, ctx };
}

// a react component that takes a photo with getUserMedia and sends it to the server
export function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function startWebcam() {
    try {
      setIsLoading(true);
      setError(null);
      const stream = await navigator.mediaDevices?.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsLoading(false);
    } catch (err) {
      console.warn('Error accessing webcam:', err);
      let errorMessage = 'Could not access webcam. Please check permissions and ensure a camera is connected.';
      
      if (err instanceof Error) {
        if (err.name === 'NotReadableError') {
          errorMessage = 'Camera is busy or unavailable. Please close other apps using the camera and try again.';
        } else if (err.name === 'NotAllowedError') {
          errorMessage = 'Camera permission denied. Please allow camera access in your browser settings.';
        } else if (err.name === 'NotFoundError') {
          errorMessage = 'No camera found. Please connect a camera and try again.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  }

  async function captureImage() {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;
      const aspectRatio = video.videoWidth / video.videoHeight;
      const width = 600;
      const height = Math.floor(width / aspectRatio / 8) * 8;
      console.log(height);
      // Set canvas dimensions to match video stream
      canvas.width = width;
      canvas.height = height;

      // Draw video frame onto canvas
      context.drawImage(video, 0, 0, width, height);
      // Brightne the canvas
      const imageData = context.getImageData(0, 0, width, height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const brightness =
          (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) /
          2;
        imageData.data[i] = brightness;
        imageData.data[i + 1] = brightness;
        imageData.data[i + 2] = brightness;
      }
      context.putImageData(imageData, 0, 0);

      // Get image data URL from canvas
      const imageDataUrl = canvas.toDataURL('image/png');
      const buffer = await new Promise((resolve) => canvas.toBlob(resolve));
      // console.log(imageDataUrl, buffer);

      // Encode it
      let result = encoder
        .initialize()
        .image(canvasRef.current, canvas.width, canvas.height, 'floydsteinberg')
        .encode();

      console.log(result);
      // Set the captured image
      setCapturedImage(imageDataUrl);
      // Sent to server to print
      printImage(imageDataUrl);
    }
  }

  useEffect(() => {
    startWebcam();
  }, []);

  return (
    <div className="">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading && !error ? (
        <div className="flex items-center justify-center p-8">
          <div>Loading camera...</div>
        </div>
      ) : !error && (
        <video
          playsInline
          muted
          ref={videoRef}
          autoPlay
          className="rounded-xl"
        ></video>
      )}
      
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="flex justify-center gap-2 m-2">
        <button onClick={startWebcam} disabled={isLoading && !error}>
          {error ? 'Retry Webcam' : 'Start Webcam'}
        </button>
        <button onClick={captureImage} disabled={error !== null || isLoading}>
          {capturedImage ? 'Photo Printed!' : 'Take Photo'}
        </button>
        {/* <button onClick={() => cutPaper()}>✂️ Cut</button> */}
      </div>
    </div>
  );
}
