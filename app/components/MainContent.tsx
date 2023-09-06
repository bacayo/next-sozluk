"use client";

import { RandomEntries } from "@/types/types";
import { useRouter } from "next/navigation";
import Entry from "./Topic/Entry";
import Topic from "./Topic/Topic";
import TopicBox from "./Topic/TopicBox";
import { Session } from "@supabase/supabase-js";

interface MainContentProps {
  randomEntries?: RandomEntries;
  session?: Session | null;
}

const MainContent = ({ randomEntries, session }: MainContentProps) => {
  const router = useRouter();

  return (
    <TopicBox>
      {randomEntries?.map((entry) => (
        <div key={entry.id}>
          <Topic
            topic={entry.topics?.title}
            onClick={() => {
              router.push(`/topic/${entry.topic_id}`);
            }}
          />
          <Entry session={session} entry={entry} />
        </div>
      ))}
    </TopicBox>
  );
};

export default MainContent;
