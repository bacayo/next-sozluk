"use client";

import Topic from "@/app/components/Topic/Topic";
import React from "react";
import TopicNavbar, { NewEntries, Topics } from "./TopicNavbar";
import Entry from "@/app/components/Topic/Entry";
import { Session } from "@supabase/supabase-js";
import EntryForm from "@/app/components/EntryForm";
import { usePathname, useRouter } from "next/navigation";

interface TopicClientProps {
  session: Session | null;
  searchParams: { [key: string]: string | string[] | undefined };
  allEntries: NewEntries;
  entries: NewEntries;
  params: {
    slug: string;
  };
  topics: Topics;
}

const TopicClient = ({
  session,
  searchParams,
  allEntries,
  entries,
  params,
  topics,
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
        />
      </div>
      <div>
        {entries?.map((entry) => (
          <div key={entry.id}>
            <Entry entry={entry} session={session} />
          </div>
        ))}
      </div>
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
