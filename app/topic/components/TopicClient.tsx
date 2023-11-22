"use client";

import EntryForm from "@/app/components/EntryForm";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Session } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import ShowAllButton from "./ShowAllButton";
import TopicNavbar, { NewEntries, Topics } from "./TopicNavbar";

interface TopicClientProps {
  session: Session | null;
  searchParams: { [key: string]: string | string[] | undefined };
  allEntries: NewEntries;
  entries: NewEntries;
  params: {
    slug: string;
  };
  topics: Topics;
  count?: number | null;
  entryCount: number;
  authorName: string;
}

const TopicClient = ({
  session,
  searchParams,
  allEntries,
  entries,
  params,
  topics,
  count,
  entryCount,
  authorName,
}: TopicClientProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnClick = () => {
    router.replace(pathname);
  };

  return (
    <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10">
      <div>
        {/* <Topic onClick={handleOnClick} topic={entries![0].topics?.title} /> */}
        <Topic onClick={handleOnClick} topic={topics?.title} />
        <TopicNavbar
          topics={topics}
          searchParams={searchParams}
          allEntries={allEntries}
          entries={entries}
          entryCount={entryCount}
          topicTitle={topics?.title}
          authorName={authorName}
          session={session}
        />
      </div>
      {/* {entries!.length > 0 ? ( */}
      {entries!.length > 0 ? (
        <div>
          {entries?.map((entry) => (
            <div key={entry.id}>
              <Entry entry={entry} session={session} />
            </div>
          ))}
          {(searchParams.a === "links" || searchParams.keywords) && (
            <ShowAllButton
              count={allEntries?.length as number}
              onClick={() => {
                router.replace(pathname);
              }}
            />
          )}
        </div>
      ) : (
        <main className="flex flex-col gap-3 pl-2">
          <p>
            no suitable entries were found with the criteria you specified.{" "}
          </p>
          <ShowAllButton
            count={count as number}
            onClick={() => {
              router.replace(pathname);
            }}
          />
        </main>
      )}

      {session && (
        <EntryForm
          params={params}
          searchParams={searchParams}
          entry={entries}
        />
      )}
    </div>
  );
};

export default TopicClient;
