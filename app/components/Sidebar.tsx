"use client";
import { Topics } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SidebarProps {
  topics: Topics | undefined;
}

const Sidebar = ({ topics }: SidebarProps) => {
  const router = useRouter();

  return (
    <>
      <div className="fixed z-20 hidden w-64 h-full mt-4 overflow-y-auto text-white lg:block ">
        <div className="flex-col items-start justify-start hidden md:flex ">
          {topics?.map((item) => (
            <Link
              lang="en"
              href={`/topic/${item.title.replaceAll(" ", "-")}`}
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
