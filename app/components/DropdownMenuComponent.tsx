"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { Button } from "./ui/Button";
import { BsThreeDots } from "react-icons/bs";
import { Edit, Flag, Mail, Pin, Trash } from "lucide-react";
import { BiBlock } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";

export const DropdownMenuAuthor = ({ entry }: { entry: any }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const deleteEntry = async (id: string) => {
    const { data, count, error, status, statusText } = await supabase
      .from("entry")
      .delete()
      .eq("id", id);

    console.log({ data, status, error, statusText });
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent border-none w-fit h-fit hover:bg-transparent"
        >
          <BsThreeDots className="w-4 h-4 text-emerald-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none w-fit bg-neutral-800">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
            <Pin className="w-4 h-4 mr-2" />
            <span>pin to profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              deleteEntry(entry.id);
            }}
            className="cursor-pointer focus:bg-neutral-500"
          >
            <Trash className="w-4 h-4 mr-2" />
            <span>delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
            <Edit className="w-4 h-4 mr-2" />
            <span>edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
            <Flag className="w-4 h-4 mr-2" />
            <span>report</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const DropdownMenuEntry = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-transparent border-none w-fit h-fit hover:bg-transparent"
        >
          <BsThreeDots className="w-4 h-4 text-emerald-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none w-fit bg-neutral-800">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
            <Mail className="w-4 h-4 mr-2" />
            <span>message</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
            <BiBlock className="w-4 h-4 mr-2" />
            <span>block</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
            <Flag className="w-4 h-4 mr-2" />
            <span>report</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
