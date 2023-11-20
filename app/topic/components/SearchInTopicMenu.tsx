"use client";

import SearchInput from "@/app/components/Inputs/SearchInput";
import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { Input } from "@/app/components/ui/Input";
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
import { AiOutlineSearch } from "react-icons/ai";

interface SearchInTopicMenuProps {
  topicTitle: string;
  authorName: string;
  session: Session | null;
}

const SearchInTopicMenu = ({
  topicTitle,
  authorName,
  session,
}: SearchInTopicMenuProps) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="font-bold text-gray-400 bg-transparent border-none w-fit h-fit hover:bg-transparent hover:text-emerald-500"
        >
          search in topic <ChevronDown size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 ">
        <DropdownMenuGroup>
          <Link
            href={{
              pathname,
              query: {
                a: "today",
              },
            }}
          >
            <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>today</span>
            </DropdownMenuItem>
          </Link>
          <Link
            href={{
              // pathname,
              pathname: `/topic/${topicTitle}`,
              query: {
                a: "links",
              },
            }}
          >
            <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
              <LinkIcon className="w-4 h-4 mr-2" />
              <span>links</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>with replies</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <ImageIcon className="w-4 h-4 mr-2" />
            <span>images</span>
          </DropdownMenuItem>
          {session && (
            <Link
              href={{
                pathname,
                query: {
                  a: "search",
                  author: authorName,
                },
              }}
            >
              <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
                <User2Icon className="w-4 h-4 mr-2" />
                <span>my entries</span>
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem
            asChild
            onSelect={(e) => e.preventDefault()}
            className="hover:cursor-pointer focus:bg-neutral-500"
          >
            <div className="flex items-center w-full max-w-sm ">
              <Input
                type="search"
                placeholder="words or @author"
                className="border-none bg-neutral-700 placeholder:text-gray-400 rounded-e-none ring-offset-emerald-600"
              />
              <Button
                variant="default"
                size="icon"
                className="border-none outline-none focus:outline-none focus-visible:outline-none rounded-s-none bg-emerald-500 hover:bg-emerald-600"
              >
                <AiOutlineSearch className="w-4 h-4 text-gray-200" />
              </Button>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchInTopicMenu;
