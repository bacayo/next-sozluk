import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/DropdownMenu";
import {
  UserCircle2,
  Settings,
  BookmarkPlus,
  Users,
  Bookmark,
  Mail,
  LogOut,
  Menu as MenuIcon,
  LogInIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";
import { Session } from "@supabase/supabase-js";
import { RiRegisteredFill } from "react-icons/ri";
import Link from "next/link";

interface MenuPros {
  session: Session | null;
}

const Menu = ({ session }: MenuPros) => {
  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="lg:hidden" asChild>
        <Button
          variant="default"
          className="text-gray-200 transition focus-visible:ring-0 bg-neutral-800 hover:bg-neutral-800 hover:text-emerald-600"
        >
          <MenuIcon size={28} className="pr-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 ">
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <UserCircle2 className="w-4 h-4 mr-2" />
            <span>my profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <Settings className="w-4 h-4 mr-2" />
            <span>settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <BookmarkPlus className="w-4 h-4 mr-2" />
            <span>channels</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <Users className="w-4 h-4 mr-2" />
            <span>following/blocked</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <Bookmark className="w-4 h-4 mr-2" />
            <span>activity</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <Mail className="w-4 h-4 mr-2" />
            <span>messages</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-neutral-500" />
        <DropdownMenuItem className="focus:cursor-pointer focus:bg-neutral-500">
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="lg:hidden" asChild>
        <Button
          variant="default"
          className="text-gray-200 transition focus-visible:ring-0 bg-neutral-800 hover:bg-neutral-800 hover:text-emerald-600"
        >
          <MenuIcon size={28} className="pr-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 ">
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <LogInIcon className="w-4 h-4 mr-2" />
            <Link href="/login"> login</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
            <RiRegisteredFill className="w-4 h-4 mr-2" />
            <Link href="/register">register</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
