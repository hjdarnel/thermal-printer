import { TodoList } from '@/components/TodoList';

interface PageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  // Use a single 'data' param, which is a URL-encoded JSON string
  let title: string | undefined = undefined;
  let groups: { title: string; items: string[] }[] = [];
  let plainItems: string[] = [];
  const params = await searchParams;
  const data = typeof params?.data === 'string' ? params.data : '';
  if (data) {
    const decoded = decodeURIComponent(data);
    const parsed = JSON.parse(decoded);
    if (typeof parsed.title === 'string') title = parsed.title;
    if (Array.isArray(parsed.groups)) groups = parsed.groups;
    if (Array.isArray(parsed.plainItems)) plainItems = parsed.plainItems;
  }

  return (
    <div className="grid gap-2">
      <TodoList
        title={title}
        plainItems={plainItems}
        groups={groups}
        data={encodeURIComponent(JSON.stringify({ title, groups, plainItems }))}
      />
    </div>
  );
}
