import React from 'react';
import { PhotoBooth } from '@/components/PhotoBooth';
import TestPrinter from '@/components/Test';
import TodoPrinter from '@/components/TodoPrinter';
import { PlainText } from '@/components/PlainText';
import Cut from '@/components/Cut';

export default function Home() {
  return (
    <main className="text-center p-[50px]">
      <h2 className="text-2xl">JavaScript Thermal Printer!</h2>
      <p>Type something and it will print on my computer</p>
      <div
        className="grid gap-10 m-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}
      >
        <div>
          <p className="text-center">Send a Photo</p>
          <PhotoBooth />
        </div>
        {/* <div>
          <p className="text-center">Send a message</p>
          <Chat />
        </div> */}
        <div>
          <p className="text-center">Create a Todo List</p>
          <TodoPrinter />
        </div>
        <div>
          <p className="text-center">Print some plaintext</p>
          <PlainText />
        </div>
        <div>
          <TestPrinter />
          <Cut />
        </div>
      </div>
    </main>
  );
}
