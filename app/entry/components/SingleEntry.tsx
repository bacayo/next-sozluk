"use client";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Button } from "@/app/components/ui/Button";
import TopicNavbar from "@/app/topic/components/TopicNavbar";
import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";

interface SingleEntryProps {
  topicTitle: string;
  params: {
    slug: string[];
  };
  session?: Session | null;
  entry: any;
  beforeEntryCount: number;
  afterEntryCount: number;
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
  afterEntryCount,
  beforeEntryCount,
}: SingleEntryProps) => {
  return (
    <>
      <Topic topic={topicTitle} />
      <TopicNavbar searchParams={params} topicTitle={topicTitle} />
      <Link href={`/topic/${topicTitle}`}>
        {beforeEntryCount > 0 && (
          <Button
            size="default"
            className="w-full text-emerald-500 bg-neutral-800 hover:bg-neutral-700 "
          >
            {beforeEntryCount} more entries
          </Button>
        )}
      </Link>
      <Entry entry={entry} session={session} />
      {/* <br /> */}
      {afterEntryCount !== 0 && (
        <Link href={`/topic/${topicTitle}`}>
          <Button
            size="default"
            className="w-full mb-4 text-emerald-500 bg-neutral-800 hover:bg-neutral-700"
          >
            {afterEntryCount} more entries
          </Button>
        </Link>
      )}
    </>
  );
};

export default SingleEntry;
