import { SentryIssue } from '@/components/SentryIssue';
import { getIssue } from '@/lib/sentry';

export default async function Page() {
  return <SentryIssue />;
}
