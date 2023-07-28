"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setTopicId } from "../redux/slices/setTopicIdSlice";

interface SidebarProps {
  topics: Topics | undefined;
}

type Topics =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
    }[]
  | null;

const Sidebar = ({ topics }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const router = useRouter();

  const handleClick = useCallback(
    (item: any) => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery: any = {
        ...currentQuery,
        // categorty: topics,
        topic: item?.title.replace(/\s/g, ""),
      };

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
          skipEmptyString: true,
        }
      );

      router.push(url);
      dispatch(setTopicId(item?.id));
    },
    [params, router, dispatch]
  );

  return (
    <div className="flex flex-col items-start justify-start h-screen overflow-y-auto w-60">
      {topics?.map((item) => (
        <p
          onClick={() => {
            handleClick(item);
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
