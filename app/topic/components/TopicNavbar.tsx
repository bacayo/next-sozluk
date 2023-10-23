"use client";

import { Button } from "@/app/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/Select";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import SearchInTopicMenu from "./SearchInTopicMenu";

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
}

const TopicNavbar = ({
  searchParams,
  allEntries,
  entries,
  topics,
}: TopicNavbarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const entryLength = useMemo(() => {
    const length = allEntries?.length;
    return Math.ceil((length as number) / 10);
  }, [allEntries]);

  const selectedFilter = searchParams.a;

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
                  selectedFilter === item
                    ? " text-emerald-500"
                    : "text-gray-400"
                }
                `}
              >
                {item}
              </Link>
            ))}
          </div>
          {/* Search */}
          <div>
            <SearchInTopicMenu />
          </div>
          <div>
            <div className="font-bold text-gray-400 hover:cursor-pointer hover:text-emerald-500">
              follow
            </div>
          </div>
        </div>
        {entryLength > 1 && entries?.length !== 0 && (
          <div className="flex flex-row items-center justify-end gap-2 md:justify-center ">
            {searchParams.page !== "1" && searchParams.page && (
              <Link
                href={{
                  pathname,
                  query: {
                    ...(selectedFilter && { a: selectedFilter }),
                    page: page > 1 ? page - 1 : 1,
                  },
                }}
              >
                <Button
                  size="sm"
                  className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
                  variant="outline"
                >
                  «
                </Button>
              </Link>
            )}
            {/* Left handside */}
            <div>
              <Select
                onValueChange={(e) => {
                  const params = new URLSearchParams();
                  params.append("page", (Number(e) + 1).toString());
                  router.push(pathname + "?" + params.toString());
                }}
              >
                {/* <SelectTrigger className="w-[180px]"> */}
                <SelectTrigger className="border-none w-fit h-fit md:w-16 md:h-8 ring-0 focus:ring-0 bg-neutral-800">
                  <SelectValue
                    placeholder={searchParams.page ? searchParams.page : 1}
                  />
                </SelectTrigger>
                <SelectContent className="w-16 bg-neutral-800 ">
                  {Array.from({ length: entryLength }, (x, k) => (
                    <SelectGroup key={k} className="w-16">
                      <SelectItem
                        className="focus:bg-neutral-700"
                        value={k.toString()}
                      >
                        {k + 1}
                      </SelectItem>
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Right handside */}
            <div className="text-sm">/</div>
            <div>
              <Button
                variant="outline"
                size="sm"
                className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
              >
                {entryLength}
              </Button>
            </div>
            {searchParams.page !== entryLength.toString() && (
              <Link
                href={{
                  pathname,
                  query: {
                    // page: page + 1,
                    ...(selectedFilter && { a: selectedFilter }),
                    page: page + 1,
                  },
                }}
              >
                <Button
                  size="sm"
                  className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
                  variant="outline"
                >
                  »{" "}
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicNavbar;
