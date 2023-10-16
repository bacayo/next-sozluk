"use client";

import { Database } from "@/lib/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";
import {
  DropdownMenuAuthor,
  DropdownMenuEntry,
} from "../DropdownMenuComponent";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Loader2 } from "lucide-react";
import { useFormatDate } from "@/app/hooks/useFormatDate";
interface EntryProps {
  entry: any;
  session?: Session | null;
}

type Result =
  | {
      created_at: string;
      entryId: string | null;
      id: string;
      userId: string | null;
      profiles: {
        username: string | null;
        id: string;
      } | null;
    }[]
  | null;

async function getFavorites(entryId: string) {
  const supabase = createClientComponentClient<Database>();

  const { data: favoritesList } = await supabase
    .from("favorites")
    .select("*,profiles(username,id)")
    .eq("entryId", entryId);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return favoritesList;
}

const Entry = ({ entry, session }: EntryProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [userFavorites, setUserFavorites] = useState<Result>();
  const [loading, setLoading] = useState(false);
  const formatCreatedAt = useFormatDate();

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

  const onLoadUserFavorites = async (entryId: string) => {
    setLoading(true);
    try {
      const results = await getFavorites(entryId);
      setUserFavorites(results);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

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
                // <p
                //   onClick={async () => {
                //     const results = await getFavorites(entry.id);
                //     setUserFavorites(results);
                //     console.log(results);
                //   }}
                //   className="text-sm cursor-pointer text-emerald-400"
                // >
                //   {entry.favorites.length}
                // </p>

                <DropdownMenu
                  onOpenChange={() => {
                    onLoadUserFavorites(entry.id);
                  }}
                >
                  <DropdownMenuTrigger
                    onClick={() => {
                      console.log("hello");
                    }}
                    asChild
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="bg-transparent border-none w-fit h-fit text-emerald-500 hover:text-emerald-500 hover:bg-transparent"
                    >
                      <span>{entry.favorites.length}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  {loading ? (
                    <DropdownMenuContent className="w-56 shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 ">
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="bg-transparent border-none w-fit h-fit text-emerald-500 hover:text-emerald-500 hover:bg-transparent"
                          >
                            <Loader2 className="w-4 h-4 mr-2 animate-spin " />
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  ) : (
                    <DropdownMenuContent className="flex flex-col w-56 gap-1 overflow-y-auto shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 max-h-80 ">
                      {userFavorites?.map((item) => (
                        <section
                          key={item.id}
                          className="text-sm text-emerald-500"
                        >
                          <Link
                            href={`/author/${item.profiles?.username}`}
                            className="px-2 hover:cursor-pointer hover:underline"
                          >
                            @{item.profiles?.username}
                          </Link>
                        </section>
                      ))}
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              )}
            </>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 text-sm ">
          {/* <p className="text-xs cursor-pointer hover:underline ">{entryDate}</p> */}
          <p className="text-xs cursor-pointer hover:underline ">
            {formatCreatedAt(entry.created_at)}
          </p>
          <p className="text-xs cursor-pointer hover:underline ">
            {entry.updated_at && formatCreatedAt(entry.updated_at)}
          </p>
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
