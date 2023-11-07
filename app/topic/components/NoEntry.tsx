"use client";

import Topic from "@/app/components/Topic/Topic";
import React from "react";
import TopicNavbar, { NewEntries, Topics } from "./TopicNavbar";
import { usePathname, useRouter } from "next/navigation";

interface NoEntryProps {
  searchParams: { [key: string]: string | string[] | undefined };
  allEntries: NewEntries;
  entries: NewEntries;
  params: {
    slug: string;
  };
  topics: Topics;
}

const NoEntry = ({
  params,
  topics,
  allEntries,
  searchParams,
  entries,
}: NoEntryProps) => {
  const { slug } = params;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10">
      <Topic
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
      />
      <p>no suitable entries were found with the criteria you specified.</p>
    </div>
  );
};

export default NoEntry;
