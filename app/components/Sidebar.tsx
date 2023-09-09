"use client";
import { Topics } from "@/types/types";
import Link from "next/link";

interface SidebarProps {
  topics: Topics | undefined;
}

const Sidebar = ({ topics }: SidebarProps) => {
  return (
    <>
      <div className="fixed z-20 hidden w-64 h-full overflow-y-auto text-white lg:block ">
        <div className="flex-col items-start justify-start hidden md:flex ">
          {topics?.map((item) => (
            <Link
              href={`/topic/${item.id}`}
              className="w-full p-2 cursor-pointer hover:bg-neutral-700"
              key={item.id}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
