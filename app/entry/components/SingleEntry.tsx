"use client";
import { Result } from "@/app/author/components/AuthorEntry";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Button } from "@/app/components/ui/Button";
import TopicNavbar from "@/app/topic/components/TopicNavbar";
import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import React, { useState } from "react";

interface SingleEntryProps {
  topicTitle: string;
  params: {
    slug: string[];
  };
  session?: Session | null;
  entry: any;
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

const SingleEntry = ({
  topicTitle,
  params,
  session,
  entry,
}: SingleEntryProps) => {
  const [userFavorites, setUserFavorites] = useState<Result>();
  const [loading, setLoading] = useState(false);

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
      <Topic topic={topicTitle} />
      <TopicNavbar searchParams={params} />
      <Button
        size="default"
        className="w-full text-gray-200 bg-neutral-800 hover:bg-neutral-700"
      >
        5 more entries
      </Button>
      <Entry entry={entry} session={session} />
      <br />
      <Button
        size="default"
        className="w-full text-gray-200 bg-neutral-800 hover:bg-neutral-700"
      >
        30 more entries
      </Button>
    </>
  );
};

export default SingleEntry;
