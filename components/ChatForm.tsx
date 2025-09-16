'use client';

import { printMessage } from '@/lib/chat';
import { useActionState } from 'react';

export function ChatForm() {
  const [state, formAction] = useActionState(printMessage, { body: '' });
  return (
    <form action={formAction}>
      <input
        placeholder="Name"
        type="text"
        name="name"
        required
        maxLength={25}
        defaultValue={(state.name as string) || ''}
      />
      <input
        placeholder="Message. Be nice, AI will judge"
        type="text"
        name="message"
        id="message"
        maxLength={50}
      />
      <button type="submit">Send</button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </form>
  );
}
