"use client";

import { useFormatDate } from "@/app/hooks/useFormatDate";
import { useFormatEntryText } from "@/app/hooks/useFormatEntryText";
import { Database } from "@/lib/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Loader2, MoreHorizontal } from "lucide-react";
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
  const [showFullEntry, setShowFullEntry] = useState(false);

  const [loading, setLoading] = useState(false);
  const formatCreatedAt = useFormatDate();
  const formattedText = useFormatEntryText();

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
    <section className="mb-8 ">
      <div
        className="p-2 whitespace-pre-line "
        dangerouslySetInnerHTML={{
          __html: showFullEntry
            ? formattedText(entry.text)
            : formattedText(entry.text).slice(0, 700),
        }}
      />
      {!showFullEntry && entry.text.length > 700 && (
        <Button
          className="flex items-center gap-2 text-sm text-gray-500 bg-transparent hover:underline hover:bg-transparent"
          size="sm"
          onClick={() => {
            setShowFullEntry((prev) => !prev);
          }}
        >
          <MoreHorizontal
            size={16}
            className="text-left bg-slate-800 text-emerald-600"
          />{" "}
          continue reading
        </Button>
      )}
      <div className="flex flex-col justify-between gap-2 px-2 pt-2 md:flex-row">
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
        {/* <div className="flex flex-col-reverse items-end text-sm bg-red-400 md:flex md:flex-row md:items-center md:gap-2 "> */}
        <div className="flex flex-col items-end gap-1 md:flex-row md:items-center md:gap-2 ">
          <div className="flex gap-1">
            <p className="text-xs cursor-pointer hover:underline ">
              {formatCreatedAt(entry.created_at)}
            </p>
            <p className="text-xs cursor-pointer hover:underline ">
              {entry.updated_at && formatCreatedAt(entry.updated_at)}
            </p>
          </div>
          <div className="flex gap-2">
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
      </div>
    </section>
  );
};

export default Entry;
