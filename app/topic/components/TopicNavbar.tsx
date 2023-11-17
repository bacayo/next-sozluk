"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Pagination from "./Pagination";
import SearchInTopicMenu from "./SearchInTopicMenu";
import { Session } from "@supabase/supabase-js";

export type NewEntries =
  | {
      created_at: string;
      id: string;
      text: string;
      topic_id: string;
      updated_at: string | null;
      user_id: string;
      vote: number;
      topics: {
        created_at: string;
        id: string;
        title: string;
        updated_at: string | null;
        user_id: string;
      } | null;
      favorites: {
        created_at: string;
        entryId: string | null;
        id: string | null;
        userId: string | null;
      }[];
      profiles: {
        avatar_url: string | null;
        id: string;
        updated_at: string | null;
        username: string | null;
      } | null;
    }[]
  | null;

const filters = ["all", "today"];

export type Topics = {
  title: string;
} | null;

interface TopicNavbarProps {
  searchParams: { [key: string]: string | string[] | undefined };
  allEntries?: NewEntries;
  entries?: NewEntries;
  topics?: Topics;
  entryCount?: number;
  topicTitle?: string;
  authorName: string;
  session: Session | null;
}

const TopicNavbar = ({
  searchParams,
  entries,
  entryCount,
  topicTitle,
  authorName,
  session,
}: TopicNavbarProps) => {
  const pathname = usePathname();
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const entryLength = useMemo(() => {
    return Math.ceil((entryCount as number) / 10);
  }, [entryCount]);

  const params = useSearchParams();
  const a = params.get("a");

  return (
    <div className="pl-2 ">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between gap-4 pb-3 text-sm md:items-center">
          {/* Sort */}
          <div className="flex items-center gap-1 ">
            <div>nice:</div>
            {filters.map((item, index) => (
              <Link
                // href={pathname + `?a=${item === "all" ? "nice" : "nicetoday"}`}
                href={pathname + `?a=${item}`}
                key={index}
                className={`font-bold md:hover:cursor-pointer  hover:cursor-pointer hover:text-emerald-500 ${
                  // item === "all" && selectedFilter === "nice"
                  a === item ? " text-emerald-500" : "text-gray-400"
                }
                `}
              >
                {item}
              </Link>
            ))}
          </div>
          {/* Search */}
          <div>
            <SearchInTopicMenu
              topicTitle={topicTitle as string}
              authorName={authorName}
              session={session}
            />
          </div>
          <div>
            <div className="font-bold text-gray-400 hover:cursor-pointer hover:text-emerald-500">
              follow
            </div>
          </div>
        </div>
        {/* Entry count */}
        {/* {entryLength > 1 && entries?.length !== 0 && ( */}
        {entryLength > 1 && entries?.length !== 0 && (
          <Pagination
            entryLength={entryLength}
            page={page}
            pathname={pathname}
            searchParams={searchParams}
          />
        )}
      </div>
    </div>
  );
};

export default TopicNavbar;
