"use client";

import { Button } from "@/app/components/ui/Button";
import {
  Command,
  CommandInput
} from "@/app/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/Popover";
import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import {
  Calendar,
  ChevronDown,
  ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  User2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SearchInTopicMenuProps {
  topicTitle: string;
  authorName: string;
  session: Session | null;
}

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const SearchInTopicMenu = ({
  topicTitle,
  authorName,
  session,
}: SearchInTopicMenuProps) => {
  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();
  const [query, setQuery] = useState<Profile[] | null>([]);
  const [queryText, setQueryText] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .ilike("username", `${queryText}%`);

      if (queryText === "") {
        setQuery(null);
      } else {
        setQuery(data);
      }
    };

    fetchUser();
  }, [queryText, supabase]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="font-bold text-gray-400 bg-transparent border-none w-fit h-fit hover:bg-transparent hover:text-emerald-500"
          >
            search in topic <ChevronDown size={18} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-neutral-800 border-none">
          <div className="grid gap-4 ">
            <div className="grid gap-2 ">
              <div className="grid items-center grid-cols-1 gap-4">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex items-center px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-neutral-500"
                  href={{
                    pathname,
                    query: {
                      a: "today",
                    },
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>today</span>
                </Link>
              </div>
              <div className="grid items-center grid-cols-1 gap-4">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex items-center px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-neutral-500"
                  href={{
                    pathname: `/topic/${topicTitle}`,
                    query: {
                      a: "links",
                    },
                  }}
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  <span>links</span>
                </Link>
              </div>
              <div className="grid items-center grid-cols-1 gap-4">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex items-center px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-neutral-500"
                  href={"/"}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>with replies</span>
                </Link>
              </div>
              <div className="grid items-center grid-cols-1 gap-4">
                <Link
                  onClick={() => setOpen(false)}
                  className="flex items-center px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-neutral-500"
                  href={"/"}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  <span>images</span>
                </Link>
              </div>
              {session && (
                <div className="grid items-center grid-cols-1 gap-4">
                  <Link
                    onClick={() => setOpen(false)}
                    className="flex items-center px-2 py-1 rounded-sm hover:cursor-pointer hover:bg-neutral-500"
                    href={{
                      pathname,
                      query: {
                        a: "search",
                        author: authorName,
                      },
                    }}
                  >
                    <User2Icon className="w-4 h-4 mr-2" />
                    <span>my entries</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <Command className="bg-neutral-700">
            <CommandInput
              onValueChange={(e) => {
                if (e.startsWith("@")) {
                  setQueryText(e.substring(1));
                } else {
                  setQueryText(e);
                }
              }}
              className="placeholder:text-gray-400"
              placeholder="words or @author"
            />
            {query?.map((item) => (
              <React.Fragment key={item.id}>
                <Link
                  href={{
                    pathname,
                    query: {
                      a: "search",
                      keywords: `@${item.username}`,
                    },
                  }}
                  onClick={() => {
                    setOpen(false);
                    setQuery(null);
                  }}
                  className="px-2 py-1.5 hover:bg-neutral-500 hover:cursor-pointer text-sm text-gray-200 bg-neutral-800"
                >
                  @{item.username}
                </Link>
              </React.Fragment>
            ))}
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SearchInTopicMenu;
