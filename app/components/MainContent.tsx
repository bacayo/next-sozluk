"use client";

import { RandomEntries } from "@/types/types";
import { useRouter } from "next/navigation";
import Entry from "./Topic/Entry";
import Topic from "./Topic/Topic";
import TopicBox from "./Topic/TopicBox";
import { Session } from "@supabase/supabase-js";
import { useAppSelector } from "../hooks/reduxHooks";
import Sidebar from "./Sidebar";
import Link from "next/link";

type Topics =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
      entry: {
        created_at: string;
        date: string | null;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string;
        user_id: string;
        vote: number;
      }[];
    }[]
  | null;

interface MainContentProps {
  randomEntries?: RandomEntries;
  session?: Session | null;
  topics?: Topics;
  todayTopics?: Topics;
}

const MainContent = ({
  randomEntries,
  session,
  topics,
  todayTopics,
}: MainContentProps) => {
  const router = useRouter();
  const { navbarCategory } = useAppSelector((state) => state.setNavbarCategory);

  if (navbarCategory === "popular" && screen.width < 640) {
    return (
      <div className="flex-grow mx-auto pt-28 lg:ml-64 lg:pl-10 ">
        {topics?.map((topic) => {
          return (
            <main className="flex items-center justify-between" key={topic.id}>
              <Link href={`/topic/${topic.title}`}>
                <p className="p-2 text-gray-200 cursor-pointer">
                  {topic.title}
                </p>
              </Link>
              <p className="text-gray-400">{topic && topic.entry.length}</p>
            </main>
          );
        })}
      </div>
    );
  }

  if (navbarCategory === "today" && screen.width < 640) {
    return (
      <div className="flex-grow mx-auto pt-28 lg:ml-64 lg:pl-10 ">
        {todayTopics?.map((topic) => {
          return (
            <main className="flex items-center justify-between" key={topic.id}>
              <Link href={`/topic/${topic.title}`}>
                <p className="p-2 text-gray-200 cursor-pointer">
                  {topic.title}
                </p>
              </Link>
              <p className="text-gray-400">{topic && topic.entry.length}</p>
            </main>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex-grow mx-auto pt-28 lg:ml-64 lg:pl-10 ">
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
