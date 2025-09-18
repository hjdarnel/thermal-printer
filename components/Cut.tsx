"use client";

import { cutPaper } from "@/actions/print";

export default function TestPrinter() {
  return (
    <main>
      <form action={cutPaper}>
        <button type="submit">Cut! ✂️</button>
      </form>
    </main>
  );
}
