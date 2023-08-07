"use client";

import { useEffect, useState } from "react";
import { getEntriesByTopicId } from "../actions/getEntriesByTopicId";
import { useAppSelector } from "../hooks/reduxHooks";
import Entry from "./Topic/Entry";
import Topic from "./Topic/Topic";
import TopicBox from "./Topic/TopicBox";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Entry =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
      entry: {
        created_at: string;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string | null;
        user_id: string;
        profiles: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        } | null;
      }[];
    }[]
  | null;

type RandomEntries =
  | {
      created_at: string | null;
      id: string | null;
      text: string | null;
      topic_id: string | null;
      updated_at: string | null;
      user_id: string | null;
      profiles: {
        avatar_url: string | null;
        id: string;
        updated_at: string | null;
        username: string | null;
      } | null;
      topics: {
        created_at: string;
        id: string;
        title: string;
        updated_at: string | null;
        user_id: string;
      } | null;
    }[]
  | null;

interface MainContentProps {
  randomEntries?: RandomEntries;
}

const MainContent = ({ randomEntries }: MainContentProps) => {
  const { topicId } = useAppSelector((state) => state.setTopicId);
  const [entry, setEntry] = useState<Entry>();

  // const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  useEffect(() => {
    const getEntries = async () => {
      const entries = await getEntriesByTopicId(topicId as string);
      setEntry(entries);
    };
    if (topicId) {
      getEntries();
      router.refresh();
    }
  }, [topicId, router]);

  if (!topicId) {
    return (
      <TopicBox>
        {randomEntries?.map((item) => (
          <div key={item.id}>
            <Topic topic={item.topics?.title} />
            <Entry entry={item} />
          </div>
        ))}
      </TopicBox>
    );
  }

  return (
    <div className="flex-grow text-gray-200">
      {entry?.map((item) => (
        <Topic key={item.id} topic={item.title.toLowerCase()} />
      ))}
      {entry?.map((item) =>
        item.entry.map((i) => <Entry key={i.id} entry={i} />)
      )}
    </div>
  );
};

export default MainContent;
