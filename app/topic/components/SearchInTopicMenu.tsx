import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { Button } from "@/app/components/ui/Button";
import {
  Calendar,
  ChevronDown,
  ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  User2Icon,
} from "lucide-react";
import Link from "next/link";

const SearchInTopicMenu = () => {
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
          <Link href={`/`}>
            <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>today</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <LinkIcon className="w-4 h-4 mr-2" />
            <span>links</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>with replies</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <ImageIcon className="w-4 h-4 mr-2" />
            <span>images</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <User2Icon className="w-4 h-4 mr-2" />
            <span>my entries</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SearchInTopicMenu;