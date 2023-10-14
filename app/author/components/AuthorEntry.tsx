"use client";

import { useAppSelector } from "@/app/hooks/reduxHooks";
import { Database } from "@/lib/supabase";
import { Author } from "@/types/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import AuthorEntryComponent from "./AuthorEntryComponent";
import Favorites from "./Favorites";

export type Result =
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

export type FavEntries =
  | {
      created_at: string;
      entryId: string | null;
      id: string;
      userId: string | null;
      entry: {
        created_at: string;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string | null;
        user_id: string;
        vote: number;
        favorites: {
          created_at: string;
          entryId: string | null;
          id: string;
          userId: string | null;
        }[];
        topics: {
          created_at: string;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        } | null;
        profiles: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        } | null;
      } | null;
    }[]
  | null;

export type Item = {
  created_at: string;
  id: string;
  text: string;
  topic_id: string;
  updated_at: string | null;
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
};

interface AuthorEntryProps {
  author: Author;
  // entry: Entry;
  session: Session | null;
  favEntries: FavEntries;
}

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

const AuthorEntry = ({ author, session, favEntries }: AuthorEntryProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { category } = useAppSelector((state) => state.authorPageCategory);

  const [userFavorites, setUserFavorites] = useState<Result>();
  const [loading, setLoading] = useState(false);

  const formattedText = useCallback((formatText: string) => {
    const linkRegex = /\[([^\]]+) ([^\]]+)\]/g;
    const spoilerRegex = /--`spoiler`--/g;
    const placeholderRegex = /`:(.*?)`/;

    const formatted = formatText
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
  }, []);

  // Format supabase date to more readeble fashion
  const formattedDate = useCallback((date: string) => {
    const entryDate = new Date(date);
    const result = format(entryDate, "MMM d, yyyy hh:mm aaaa");
    return result;
  }, []);

  const setFavorites = useCallback(
    (fav: Item) => {
      const x = fav.favorites.filter(
        (item) => item.userId === session?.user.id
      );
      return x.length;
    },
    [session]
  );

  const setFavoritesFavs = useCallback(() => {
    const x = favEntries?.map((item) =>
      item.entry?.favorites.filter((item) => item.userId === session?.user.id)
    );
    return x ? x.length : 0;
  }, [session, favEntries]);

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

  const removeFavorites = async (entryId: string) => {
    const { status, data, error, statusText } = await supabase
      .from("favorites")
      .delete()
      .eq("entryId", entryId)
      // .eq("entryId", item.id)
      .eq("userId", session?.user.id);

    console.log({ status, data, error, statusText });

    if (status === 204) {
      router.refresh();
    }
  };

  const deleteEntry = async (id: string) => {
    const { status } = await supabase.from("entry").delete().eq("id", id);

    if (status === 204) {
      router.refresh();
    }
  };

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

  return category === "favorites" ? (
    <Favorites favEntries={favEntries} session={session} />
  ) : (
    <AuthorEntryComponent author={author} session={session} />
  );
};
export default AuthorEntry;
