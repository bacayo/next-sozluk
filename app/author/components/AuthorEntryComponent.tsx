"use client";

import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { useFormatDate } from "@/app/hooks/useFormatDate";
import { useFormatEntryText } from "@/app/hooks/useFormatEntryText";
import { useSetFavorites } from "@/app/hooks/useSetFavorites";
import { Database } from "@/lib/supabase";
import { Author } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { Edit, Flag, Pin, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";
import FavoriteDropdownMenu from "./FavoriteDropdownMenu";

interface AuthorEntryComponentProps {
  author: Author;
  session: Session | null;
}

const AuthorEntryComponent = ({
  author,
  session,
}: AuthorEntryComponentProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const formattedText = useFormatEntryText();
  const formattedDate = useFormatDate();
  const setFavorites = useSetFavorites();

  const removeFavorites = async (entryId: string) => {
    const { status, data, error, statusText } = await supabase
      .from("favorites")
      .delete()
      .eq("entryId", entryId)
      .eq("userId", session?.user.id);

    console.log({ status, data, error, statusText });

    if (status === 204) {
      router.refresh();
    }
  };

  const addToFavorites = async (entryId: string) => {
    const { data, status, error, statusText } = await supabase
      .from("favorites")
      .insert({
        userId: session?.user.id,
        entryId: entryId,
      })
      .select();
    console.log({ data, status, error, statusText });
    if (status === 201) {
      router.refresh();
    }
  };

  const deleteEntry = async (id: string) => {
    const { status } = await supabase.from("entry").delete().eq("id", id);

    if (status === 204) {
      router.refresh();
    }
  };

  return (
    <>
      {author?.entry.map((item) => (
        <React.Fragment key={item.id}>
          <div className="pt-4">
            <Link
              className="text-xl font-bold cursor-pointer text-emerald-500 hover:underline"
              href={`/topic/${item.topics?.title}`}
            >
              {item.topics?.title}
            </Link>
          </div>
          {/* <p>{formattedText}</p> */}
          <div
            className="pt-2 whitespace-pre-line "
            dangerouslySetInnerHTML={{ __html: formattedText(item.text) }}
          />

          {/* Socials */}
          <div className="flex flex-row justify-between mt-2">
            <div className="flex items-center gap-3">
              <TfiFacebook
                title="share to facebook"
                size={14}
                className="transition cursor-pointer hover:text-blue-600"
              />
              <FaTwitter
                title="tweet this in twitter"
                size={14}
                className="transition cursor-pointer hover:text-sky-500"
              />
              <FaChevronUp
                title="nice"
                size={16}
                className="transition cursor-pointer hover:text-green-500"
              />
              <FaChevronDown
                title="awful"
                size={16}
                className="transition cursor-pointer hover:text-red-700"
              />
              {session && (
                <>
                  {/* Add or remove favorites */}
                  <FiStar
                    title={
                      setFavorites(item.favorites, session) > 0
                        ? "remove from favorites"
                        : "add to favorites"
                    }
                    onClick={() => {
                      setFavorites(item.favorites, session) > 0
                        ? removeFavorites(item.id)
                        : addToFavorites(item.id);
                      // router.refresh();
                    }}
                    size={16}
                    // className={`transition-colors cursor-pointer hover:text-emerald-400 hover:fill-emerald-400  `}
                    className={`transition-colors cursor-pointer hover:text-emerald-400 hover:fill-emerald-400 ${
                      setFavorites(item.favorites, session) > 0 &&
                      "fill-emerald-400 text-emerald-400"
                    } `}
                  />
                  {item.favorites.length > 0 && (
                    <FavoriteDropdownMenu
                      entryId={item.id}
                      favorites={item.favorites}
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex flex-row items-center gap-1 text-sm ">
              <p className="text-xs cursor-pointer hover:underline">
                {formattedDate(item.created_at)}
              </p>

              <Link
                href={`/author/${author?.username}`}
                className="text-sm cursor-pointer text-emerald-500 hover:underline"
              >
                {author?.username}
              </Link>
              {session && (
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
                          deleteEntry(item.id);
                        }}
                        className="cursor-pointer focus:bg-neutral-500"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        <span>delete</span>
                      </DropdownMenuItem>
                      <Link href={`/entry/update/${item.id}`}>
                        <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
                          <Edit className="w-4 h-4 mr-2" />
                          <span>edit</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
                        <Flag className="w-4 h-4 mr-2" />
                        <span>report</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default AuthorEntryComponent;
