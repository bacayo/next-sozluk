"use client";

import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { Database } from "@/lib/supabase";
import { Author, Entry } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import { Edit, Flag, Pin, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";

interface AuthorEntryProps {
  author: Author;
  entry: Entry;
  session: Session | null;
}

const AuthorEntry = ({ author, entry, session }: AuthorEntryProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

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
      //@ts-ignore
      .replace(placeholderRegex, (text) => {
        const extractedText = text.match(placeholderRegex);
        if (extractedText) {
          return `<a style="color: #10b981; cursor: pointer;" href="/topic/${extractedText[1]}">*</a>`;
        }
      });

    return formatted;
  }, [entry]);

  // Format supabase date to more readeble fashion
  const formattedDate = useMemo(() => {
    const entryDate = new Date(entry?.created_at);
    const result = format(entryDate, "MMM d, yyyy hh:mm aaaa");
    return result;
  }, [entry]);

  const setFavorites = useMemo(() => {
    const x = entry.favorites.filter(
      (item) => item.userId === session?.user.id
    );
    return x.length;
  }, [entry, session]);

  const addToFavorites = async () => {
    await supabase.from("favorites").insert({
      userId: session?.user.id,
      entryId: entry.id,
    });
  };

  const removeFavorites = async () => {
    await supabase
      .from("favorites")
      .delete()
      .eq("entryId", entry.id)
      .eq("userId", session?.user.id);
  };

  const deleteEntry = async (id: string) => {
    const { data, count, error, status, statusText } = await supabase
      .from("entry")
      .delete()
      .eq("id", id);

    console.log({ data, status, error, statusText });
    router.refresh();
  };

  return (
    <div className="py-2 ">
      <Link
        className="text-xl font-bold cursor-pointer text-emerald-500 hover:underline"
        href={`/topic/${entry.topics?.title}`}
      >
        {entry.topics?.title}
      </Link>
      {/* <p>{entry.text}</p> */}
      <div
        className="p-2 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: formattedText }}
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
              <p className="text-sm cursor-pointer text-emerald-400">
                {entry.favorites.length}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-row items-center gap-1 text-sm ">
          <p className="text-xs cursor-pointer hover:underline">
            {formattedDate}
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
                      deleteEntry(entry.id);
                      // router.refresh();
                      // console.log(entry.id);
                    }}
                    className="cursor-pointer focus:bg-neutral-500"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    <span>delete</span>
                  </DropdownMenuItem>
                  <Link href={`/entry/update/${entry.id}`}>
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
    </div>
  );
};

export default AuthorEntry;
