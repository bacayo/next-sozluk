"use client";

import Topic from "@/app/components/Topic/Topic";
import React from "react";
import TopicNavbar, { NewEntries, Topics } from "./TopicNavbar";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";

interface NoEntryProps {
  searchParams: { [key: string]: string | string[] | undefined };
  allEntries: NewEntries;
  entries: NewEntries;
  params: {
    slug: string;
  };
  topics: Topics;
  authorName: string;
  session: Session;
}

const NoEntry = ({
  params,
  topics,
  allEntries,
  searchParams,
  entries,
  authorName,
  session,
}: NoEntryProps) => {
  const { slug } = params;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10">
      <Topic
        params={params}
        onClick={() => {
          router.replace(pathname);
        }}
        topic={slug}
      />
      <TopicNavbar
        topics={topics}
        allEntries={allEntries}
        searchParams={searchParams}
        entries={entries}
        authorName={authorName}
        session={session}
      />
      <p>no suitable entries were found with the criteria you specified.</p>
    </div>
  );
};

export default NoEntry;
