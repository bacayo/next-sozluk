"use client";

import {
  DropdownMenuAuthor,
  DropdownMenuEntry,
} from "@/app/components/DropdownMenuComponent";
import { useFormatEntryText } from "@/app/hooks/useFormatEntryText";
import { Favorites, useSetFavorites } from "@/app/hooks/useSetFavorites";
import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";
import { FavEntries } from "./AuthorEntry";
import FavoriteDropdownMenu from "./FavoriteDropdownMenu";
import { useFormatDate } from "@/app/hooks/useFormatDate";
import { Button } from "@/app/components/ui/Button";
import { MoreHorizontal } from "lucide-react";

interface FavoriteProps {
  favEntries: FavEntries;
  session: Session | null;
}

const Favorites = ({ favEntries, session }: FavoriteProps) => {
  const formattedText = useFormatEntryText();
  const setFavorites = useSetFavorites();
  const formattedDate = useFormatDate();
  const [showFullEntry, setShowFullEntry] = useState(false);

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const removeFavorites = async (entryId: string) => {
    const { status, data, error, statusText } = await supabase
      .from("favorites")
      .delete()
      .eq("entryId", entryId)
      .eq("userId", session?.user.id);

    if (status === 204) {
      router.refresh();
    }
  };

  return (
    <>
      {favEntries?.map((item) => (
        <section className="mb-4" key={item.id}>
          <div className="pt-4">
            <Link
              className="text-xl font-bold cursor-pointer text-emerald-500 hover:underline"
              href={`/topic/${item.entry?.topics?.title}`}
            >
              {item.entry?.topics?.title}
            </Link>
          </div>
          <div
            className="pt-2 whitespace-pre-line "
            dangerouslySetInnerHTML={{
              // __html: formattedText(item.entry?.text as string),
              __html: showFullEntry
                ? formattedText(item.entry?.text as string)
                : formattedText(item.entry?.text as string).slice(0, 700),
            }}
          />
          {!showFullEntry && (item.entry?.text.length as number) > 700 && (
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
                  <FiStar
                    title={"remove from favorites"}
                    onClick={() => {
                      removeFavorites(item.entryId as string);
                    }}
                    size={16}
                    className={`transition-colors cursor-pointer hover:text-emerald-400 hover:fill-emerald-400 ${
                      setFavorites(
                        item.entry?.favorites as Favorites,
                        session
                      ) > 0 && "fill-emerald-400 text-emerald-400"
                    } `}
                  />
                  {item.entry?.favorites.length! > 0 && (
                    <FavoriteDropdownMenu
                      entryId={item.entry?.id as string}
                      favorites={item.entry?.favorites as Favorites}
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex flex-row items-center gap-1 text-sm ">
              <p className="text-xs cursor-pointer hover:underline">
                {formattedDate(item.entry?.created_at as string)}
              </p>
              <Link
                href={`/author/${item.entry?.profiles?.username}`}
                className="text-sm cursor-pointer text-emerald-500 hover:underline"
              >
                {/* {author?.username} */}
                {item.entry?.profiles?.username}
              </Link>

              {session && (
                <>
                  {session.user.id === item.entry?.user_id ? (
                    <DropdownMenuAuthor entry={item.entry} />
                  ) : (
                    <DropdownMenuEntry />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Favorites;
