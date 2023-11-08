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
import { Edit, Flag, MoreHorizontal, Pin, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";
import FavoriteDropdownMenu from "./FavoriteDropdownMenu";

export type AuthorPage =
  | {
      created_at: string;
      date: string | null;
      id: string;
      text: string;
      topic_id: string;
      updated_at: string;
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

interface AuthorEntryComponentProps {
  //   author: Author;
  session: Session | null;
  authorPage: AuthorPage;
  username: string;
}

const AuthorEntryComponent = ({
  //   author,
  session,
  authorPage,
  username,
}: AuthorEntryComponentProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const formattedText = useFormatEntryText();
  const formattedDate = useFormatDate();
  const setFavorites = useSetFavorites();
  const [showFullEntry, setShowFullEntry] = useState(false);

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
      {/* {author?.entry.map((item) => ( */}
      {authorPage?.map((item) => (
        <section className="mb-4" key={item.id}>
          <div className="pt-4 ">
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
            dangerouslySetInnerHTML={{
              __html: showFullEntry
                ? formattedText(item.text)
                : formattedText(item.text).slice(0, 700),
            }}
          />

          {!showFullEntry && item.text.length > 700 && (
            <Button
              className="flex items-center gap-2 text-sm text-gray-500 bg-transparent hover:underline hover:bg-transparent"
              size="sm"
              onClick={() => {
                setShowFullEntry((prev) => !prev);
              }}
            >
              <MoreHorizontal
                size={16}
                className=" bg-slate-800 text-emerald-600"
              />{" "}
              continue reading
            </Button>
          )}

          {/* Socials */}
          <div className="flex flex-col justify-between gap-2 mt-2 md:flex-row">
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
            <div className="flex flex-row items-center justify-end gap-1 text-sm md:items-center ">
              <p className="text-xs cursor-pointer hover:underline">
                {formattedDate(item.created_at)}
              </p>

              <Link
                href={`/author/${username}`}
                className="text-sm cursor-pointer text-emerald-500 hover:underline"
              >
                {username}
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
        </section>
      ))}
    </>
  );
};

export default AuthorEntryComponent;
