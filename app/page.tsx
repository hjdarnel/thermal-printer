import React from 'react';
import { PhotoBooth } from '@/components/PhotoBooth';
import TestPrinter from '@/components/Test';
import TodoPrinter from '@/components/TodoPrinter';
import { PlainText } from '@/components/PlainText';
import { ImageUpload } from '@/components/ImageUpload';
import Cut from '@/components/Cut';

export default function Home() {
  return (
    <main className="text-center p-4 md:p-[50px]">
      <h2 className="text-xl md:text-2xl">JavaScript Thermal Printer!</h2>
      <p className="text-sm md:text-base mb-4">Type something and it will print on my computer</p>
      <div className="grid gap-4 md:gap-10 m-2 md:m-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="w-full max-w-sm mx-auto">
          <p className="text-center mb-3">Send a Photo</p>
          <PhotoBooth />
        </div>
        <div className="w-full max-w-sm mx-auto">
          <p className="text-center mb-3">Upload Any Image</p>
          <ImageUpload />
        </div>
        {/* <div>
          <p className="text-center">Send a message</p>
          <Chat />
        </div> */}
        <div className="w-full max-w-sm mx-auto">
          <p className="text-center mb-3">Create a Todo List</p>
          <TodoPrinter />
        </div>
        <div className="w-full max-w-sm mx-auto">
          <p className="text-center mb-3">Print some plaintext</p>
          <PlainText />
        </div>
        <div className="w-full max-w-sm mx-auto">
          <TestPrinter />
          <Cut />
        </div>
      </div>
    </main>
  );
}
