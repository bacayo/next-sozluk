// "use client";
import { Topics } from "@/types/types";
import Link from "next/link";

interface SidebarProps {
  topics: Topics | undefined;
}

const Sidebar = ({ topics }: SidebarProps) => {
  return (
    <>
      <div className="flex-col items-start justify-start hidden h-screen overflow-y-auto md:flex w-60">
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
    </>
  );
};

export default Sidebar;
