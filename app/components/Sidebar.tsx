"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

import { resetSearchQueryState } from "../redux/slices/searchQuerySlice";
import { setTopicId } from "../redux/slices/setTopicIdSlice";
import { Topics } from "@/types/types";

interface SidebarProps {
  topics: Topics | undefined;
}

const Sidebar = ({ topics }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      dispatch(setTopicId(value));
      dispatch(resetSearchQueryState());

      return params.toString();
    },
    [searchParams, dispatch]
  );
  return (
    <div className="flex-col items-start justify-start hidden h-screen overflow-y-auto md:flex w-60">
      {topics?.map((item) => (
        <p
          onClick={() => {
            // handleClick(item);
            router.push(pathname + "?" + createQueryString("topic", item.id));
          }}
          className="w-full p-2 cursor-pointer hover:bg-neutral-700"
          key={item.id}
        >
          {item.title}
        </p>
      ))}
    </div>
  );
};

export default Sidebar;
