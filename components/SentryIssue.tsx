import { takeScreenshot } from '@/actions/screenshot';
import { getIssueTags } from '@/lib/sentry';
import ms from 'ms';
import Image from 'next/image';

export async function SentryIssue() {
  const firstSeen = new Date(1);
  const firstSeenAgo = ms(Date.now() - firstSeen.getTime());
  const lastSeen = new Date(2);
  const lastSeenAgo = ms(Date.now() - (lastSeen.getTime() || Date.now()));
  return (
    <div
      className="w-[600px] rounded-xl grid gap-5 screenshot-body  bg-white wrap"
      style={{
        filter: 'invert(0)',
        overflowWrap: 'anywhere'
      }}
    >
      <form action={takeScreenshot}>
        <div className="grid grid-cols-2 place-content-center items-center">
          <button type="submit">
            <Image src="/sentry.svg" alt="Sentry" className="w-[200px]" />
          </button>
          <p className="text-xxs text-right">short</p>
        </div>
        <input hidden readOnly name="path" value="print/test" />
      </form>
      <div className="border-4 border-black">
        <h1 className="p-2 bg-black text-white">
          {/* ⚠️ {issue.metadata.type || issue.metadata.title} */}
          ⚠️ title
        </h1>
        <p className="p-2">metadata value</p>
      </div>
      {/* <p>{issue.culprit}</p> */}
      {/* <p>culprit</p> */}
      {/* <div className="grid grid-cols-2">
        <p>⏲ Last Seen {lastSeenAgo}</p>
        <p>⏲ First Seen {firstSeenAgo}</p>
      </div> */}
      {/* <div className="flex gap-2 flex-wrap">
        <Pill>
          <strong>Category</strong>
          <PillContents>Cat</PillContents>
        </Pill>
        <Pill>
          <strong>Count</strong>
          <PillContents>count</PillContents>
        </Pill>
        <Pill>
          <strong>Priority</strong>
          <PillContents>prio</PillContents>
        </Pill>
        <Pill>
          <strong>Users</strong>
          <PillContents>ct</PillContents>
        </Pill>
        <Pill>
          <strong>Platform</strong>
          <PillContents>platform</PillContents>
        </Pill>
        <Pill>
          <strong>Status</strong>
          <PillContents>status</PillContents>
        </Pill>
        <Pill>
          <strong>substatus</strong>
          <PillContents>substatus</PillContents>
        </Pill>
        <Pill>
          <strong>level</strong>
          <PillContents>level</PillContents>
        </Pill>
      </div> */}
      {/* <IssueTags tagKey="browser.name" issueId={issue.id} />
      <IssueTags tagKey="device.family" issueId={issue.id} />
      <IssueTags tagKey="os" issueId={issue.id} /> */}
      <p className="font-black text-[93px] text-center">GOOD LUCK</p>
      <p className="font-black text-[95px] text-center">HAVE FUN</p>
    </div>
  );
}

async function IssueTags({
  tagKey,
  issueId
}: {
  tagKey: string;
  issueId: string;
}) {
  const issueTags = await getIssueTags({ tagKey, issueId });
  if (!issueTags?.topValues) return null;
  return (
    <div className="border-2 border-black text-md rounded-lg p-1">
      <h2 className="rounded-md w-max bg-black text-white relative mt-[-0.5lh] px-[10px] ml-1 text-xs leading-[1.2]">
        {issueTags.name}
      </h2>
      <div className="flex flex-wrap gap-1 mt-1">
        {issueTags.topValues.map((tag) => (
          <p
            key={tag.key}
            className="text-[20px] leading-tight border-2 border-black overflow-hidden"
          >
            <strong>{tag.name} </strong>
            <span className="bg-black text-white p-1">{tag.count}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function Pill({ children }: any) {
  return (
    <div className="rounded-full bg-black text-white text-sm px-1">
      {children}
    </div>
  );
}
function PillContents({ children }: any) {
  return (
    <span className="bg-white text-black px-1 ml-1 rounded-full">
      {children}
    </span>
  );
}
