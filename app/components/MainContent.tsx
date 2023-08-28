"use client";

import { RandomEntries } from "@/types/types";
import { useRouter } from "next/navigation";
import Entry from "./Topic/Entry";
import Topic from "./Topic/Topic";
import TopicBox from "./Topic/TopicBox";

interface MainContentProps {
  randomEntries?: RandomEntries;
}

const MainContent = ({ randomEntries }: MainContentProps) => {
  const router = useRouter();

  return (
    <TopicBox>
      {randomEntries?.map((item) => (
        <div key={item.id}>
          <Topic
            onClick={() => {
              router.push(`/topic/${item.topic_id}`);
            }}
            topic={item.topics?.title}
          />
          <Entry entry={item} />
        </div>
      ))}
    </TopicBox>
  );
};

export default MainContent;
