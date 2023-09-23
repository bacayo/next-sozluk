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
    <div className="flex-grow mx-auto mt-4 lg:ml-64 ">
      <TopicBox>
        {randomEntries?.map((entry) => (
          <div key={entry.id}>
            <Topic
              topic={entry.topics?.title}
              onClick={() => {
                router.push(
                  `/topic/${entry.topics?.title.replaceAll(" ", "-")}`
                );
              }}
            />
            <Entry session={session} entry={entry} />
          </div>
        ))}
      </TopicBox>
    </div>
  );
};

export default MainContent;
