'use client';
import React from 'react';

export default function TodoPrinter() {
  const [value, setValue] = React.useState<string>(
    'Home\n- Home task 1\n- Home task 2\nWork\n- Work task 3\n- Work task 4'
  );
  const [title, setTitle] = React.useState<string>('My Todo List');

  function parseInput(input: string): {
    groups?: { title: string; items: string[] }[];
    plainItems?: string[];
  } {
    const lines = input.split(/\r?\n/);
    const nonEmptyLines = lines.filter((line) => line.trim() !== '');

    // Check if all non-empty lines start with '-'
    const allItemsArePlain = nonEmptyLines.every((line) =>
      line.trim().startsWith('-')
    );

    if (allItemsArePlain) {
      return {
        plainItems: nonEmptyLines.map((line) => line.replace(/^\s*-\s*/, ''))
      };
    }

    const groups: { title: string; items: string[] }[] = [];
    let currentGroup: { title: string; items: string[] } | null = null;
    for (const line of lines) {
      if (line.trim() === '') continue;
      if (!line.trim().startsWith('-')) {
        // New group
        currentGroup = { title: line.trim(), items: [] };
        groups.push(currentGroup);
      } else if (currentGroup) {
        currentGroup.items.push(line.replace(/^\s*-\s*/, ''));
      }
    }
    return { groups };
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { groups, plainItems } = parseInput(value);
    const data = encodeURIComponent(
      JSON.stringify({ title, groups, plainItems })
    );
    window.location.href = `/print/todo?data=${data}`;
  }

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Quick Todo List Builder</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center"
      >
        <input
          type="text"
          className="border rounded px-2 py-1 w-full max-w-xs"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border rounded px-2 py-1 w-full min-h-[240px] font-mono"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Home\n- Home task 1\n- Home task 2\nWork\n- Work task 3\n- Work task 4`}
        />
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded mt-2"
        >
          Go to Todo
        </button>
      </form>
    </div>
  );
}
