import { SentryIssue } from '@/components/SentryIssue';
import { getIssue } from '@/lib/sentry';

export default async function Page() {
  return (
    <div className="grid gap-2 m-2">
      <SentryIssue />
    </div>
  );
}
