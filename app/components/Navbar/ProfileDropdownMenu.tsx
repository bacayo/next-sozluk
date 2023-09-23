"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";

import {
  BookmarkPlus,
  LogOut,
  Settings,
  UserCircle2,
  UserPlus2,
  Users,
} from "lucide-react";

import { Button } from "../ui/Button";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";

export type Profile = {
  avatar_url: string | null;
  id: string;
  updated_at: string | null;
  username: string | null;
} | null;

interface ProfileDropdownMenuProps {
  onClick: () => void;
  session: Session;
  profile: Profile;
}

const ProfileDropdownMenu = ({
  onClick,
  session,
  profile,
}: ProfileDropdownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="text-gray-200 transition focus-visible:ring-0 bg-neutral-800 hover:bg-neutral-800 hover:text-emerald-600"
        >
          <UserPlus2 size={28} className="pr-1" /> me
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 ">
        <DropdownMenuGroup>
          <Link href={`/author/${profile?.username}`}>
            <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
              <UserCircle2 className="w-4 h-4 mr-2" />
              <span>my profile</span>
            </DropdownMenuItem>
          </Link>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-neutral-500" />
        <DropdownMenuItem
          onClick={onClick}
          className="focus:cursor-pointer focus:bg-neutral-500"
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdownMenu;
