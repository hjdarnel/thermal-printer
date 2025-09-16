import { takeScreenshot } from '@/actions/screenshot';

export interface Group {
  title: string;
  items: string[];
}

export interface Props {
  data: string;
  title?: string;
  groups?: Group[];
  plainItems?: string[];
}

export async function TodoList({ title, groups, plainItems, data }: Props) {
  return (
    <div
      className="w-[600px] rounded-xl grid gap-5 screenshot-body pr-4 bg-white wrap"
      style={{
        filter: 'invert(0)',
        overflowWrap: 'anywhere'
      }}
    >
      <form action={takeScreenshot}>
        <div>
          <button type="submit">{title ?? 'To Do List'}</button>
        </div>
        <input hidden readOnly name="path" value="print/todo" />
        <input hidden readOnly name="searchParams" value={data} />
      </form>
      {groups && groups?.length > 0 && (
        <div className="space-y-4">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="font-bold text-lg mb-2 bg-black text-white px-2 py-1 rounded">
                {group.title}
              </h2>
              <ul className="space-y-2">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-4">
                    <span className="min-w-6 min-h-6 border-2 rounded-md border-black"></span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {plainItems && plainItems?.length > 0 && (
        <ul className="grid space-y-2">
          {plainItems?.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-center gap-4">
              <span className="min-w-6 min-h-6 border-2 rounded-md border-black"></span>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
