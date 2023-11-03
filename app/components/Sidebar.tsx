"use client";
import { Topics } from "@/types/types";
import Link from "next/link";
import { useAppSelector } from "../hooks/reduxHooks";

type TodayTopics =
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

interface SidebarProps {
  topics: TodayTopics | undefined;
  todayTopic?: TodayTopics;
}

const EmptyTodaySidebar = () => {
  return (
    <div className="pt-4">
      <p className="text-xl text-gray-400">today</p>
      <p className="text-xs text-gray-200">nothing here</p>
    </div>
  );
};

const Sidebar = ({ topics, todayTopic }: SidebarProps) => {
  const { navbarCategory } = useAppSelector((state) => state.setNavbarCategory);

  if (navbarCategory === "today" && screen.width > 640) {
    return (
      <>
        <div className="fixed z-20 hidden w-64 h-full pb-32 overflow-y-auto text-white mt-28 lg:block">
          <div className="flex-col items-start justify-start hidden md:flex ">
            {todayTopic?.length === 0 && <EmptyTodaySidebar />}
            {todayTopic?.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between w-full pr-2 hover:bg-neutral-700"
              >
                <Link
                  lang="en"
                  href={`/topic/${item.title.replaceAll(" ", "-")}`}
                  className="w-full p-2 cursor-pointer "
                >
                  {item.title}
                </Link>
                <p className="text-gray-400">{item.entry.length}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed z-20 hidden w-64 h-full pb-32 overflow-y-auto text-white mt-28 lg:block">
        <div className="flex-col items-start justify-start hidden md:flex ">
          {topics?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between w-full hover:bg-neutral-700"
            >
              <Link
                lang="en"
                href={`/topic/${item.title.replaceAll(" ", "-")}`}
                className="w-full p-2 cursor-pointer "
              >
                {item.title}
              </Link>
              <p className="pr-2 text-gray-400">{item.entry.length}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
