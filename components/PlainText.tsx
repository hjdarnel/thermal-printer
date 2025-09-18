'use client';

import { printPlaintext } from '@/lib/text';
import { useActionState } from 'react';

export function PlainText() {
  const [state, formAction] = useActionState(printPlaintext, { body: '' });
  return (
    <form action={formAction}>
      
      <textarea className='border border-black rounded px-2 py-1'
        placeholder="Message"
        name="message"
        id="message"
        maxLength={100000}
        rows={5}
        cols={50}
      />
      <button type="submit">Send</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
}
