import React from 'react';
import Chat from '@/components/Chat';
import { PhotoBooth } from '@/components/PhotoBooth';
import TestPrinter from '@/components/Test';
import TodoPrinter from '@/components/client/TodoPrinter';

export default function Home() {
  return (
    <main className="text-center p-[50px]">
      <h2 className="text-2xl">JavaScript Thermal Printer!</h2>
      <p>Type something and it will print on my computer</p>
      <div className="grid gap-4 m-4 md:grid-cols-2">
        <div>
          <p className="text-center">Send a Photo</p>
          <PhotoBooth />
        </div>
        <div>
          <p className="text-center">Send a message</p>
          <Chat />
        </div>
        <div>
          <p className="text-center">Create a Todo List</p>
          <TodoPrinter />
        </div>
        <TestPrinter />
      </div>
    </main>
  );
}
