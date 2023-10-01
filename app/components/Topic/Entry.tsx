"use client";

import { Database } from "@/lib/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";
import {
  DropdownMenuAuthor,
  DropdownMenuEntry,
} from "../DropdownMenuComponent";

interface EntryProps {
  entry: any;
  session?: Session | null;
}

const Entry = ({ entry, session }: EntryProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleVote = async (entryId: string) => {
    await supabase.rpc("increment_entry_vote", { row_id: entryId });
  };

  const handleDecrementVote = async (entryId: string) => {
    await supabase.rpc("decrement_entry_vote", {
      row_id: entryId,
    });
  };

  const addToFavorites = async () => {
    const { data, error, status, statusText } = await supabase
      .from("favorites")
      .insert({
        userId: session?.user.id,
        entryId: entry.id,
      });
  };

  const removeFavorites = async () => {
    const {
      data: removeFavorites,
      status,
      error,
      statusText,
    } = await supabase
      .from("favorites")
      .delete()
      .eq("entryId", entry.id)
      .eq("userId", session?.user.id);
  };

  const setFavorites = useMemo(() => {
    const x = entry.favorites.filter((i: any) => i.userId === session?.user.id);
    return x.length;
  }, [entry, session]);

  const entryDate = useMemo(() => {
    const entryDate = new Date(entry?.created_at);
    const result = format(entryDate, "MMM d, yyyy hh:mm aaaa");
    return result;
  }, [entry]);

  // const regex = /\[([^\]]+) ([^\]]+)\]/g;
  // const spoilerRegex = /--`spoiler`--(.*?)--`spoiler`--/gs;

  const formattedText = useMemo(() => {
    const linkRegex = /\[([^\]]+) ([^\]]+)\]/g;
    const spoilerRegex = /--`spoiler`--/g;
    const placeholderRegex = /`:(.*?)`/;

    const formatted = entry.text
      .replace(linkRegex, (_: any, linkText: string, linkURL: string) => {
        return `<a target="blank" href="${linkText}" style="color: #10b981; cursor: pointer;">${linkURL}</a>`;
      })
      .replace(
        spoilerRegex,
        '<span style="color: #10b981; cursor: pointer; display:flex; flex-direction:column">--spoiler--</span>'
      )
      .replace(placeholderRegex, (text: string) => {
        const extractedText = text.match(placeholderRegex);
        if (extractedText) {
          return `<a style="color: #10b981; cursor: pointer;" href="/topic/${extractedText[1]}">*</a>`;
        }
      });

    return formatted;
  }, [entry]);

  return (
    <>
      <div
        className="p-2 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />

      <div className="flex flex-row justify-between px-2 pt-2 ">
        <div className="flex items-center gap-3 ">
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
            onClick={() => handleVote(entry.id)}
            size={16}
            className="transition cursor-pointer hover:text-green-500"
          />
          <FaChevronDown
            title="awful"
            onClick={() => handleDecrementVote(entry.id)}
            size={16}
            className="transition cursor-pointer hover:text-red-700"
          />
          {session && (
            <>
              {/* Add or remove favorites */}
              <FiStar
                title={
                  setFavorites > 0
                    ? "remove from favorites"
                    : "add to favorites"
                }
                onClick={() => {
                  setFavorites > 0 ? removeFavorites() : addToFavorites();
                  router.refresh();
                }}
                size={16}
                className={`transition-colors cursor-pointer hover:text-emerald-400 hover:fill-emerald-400 ${
                  setFavorites > 0 && "fill-emerald-400 text-emerald-400"
                } `}
              />
              {entry.favorites.length > 0 && (
                <p className="text-sm cursor-pointer text-emerald-400">
                  {/* {entry.profiles.favorites.length} */}
                  {entry.favorites.length}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 text-sm ">
          <p className="text-xs cursor-pointer hover:underline ">{entryDate}</p>
          <Link
            href={`/author/${entry?.profiles.username}`}
            className="text-sm cursor-pointer text-emerald-500 hover:underline"
          >
            {entry.profiles?.username}
          </Link>
          {session && (
            <div className="flex items-center ">
              {session?.user.id === entry.user_id ? (
                <DropdownMenuAuthor entry={entry} />
              ) : (
                <DropdownMenuEntry />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Entry;
