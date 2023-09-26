"use client";

import { differenceInDays } from "date-fns";
import Link from "next/link";
import React, { useMemo } from "react";

export type Author = {
  avatar_url: string | null;
  id: string;
  updated_at: string | null;
  username: string | null;
  entry: {
    created_at: string;
    id: string;
    text: string;
    topic_id: string;
    updated_at: string | null;
    user_id: string;
    vote: number;
  }[];
} | null;

interface HeaderLinkProps {
  author: Author;
}

const HeaderLink = ({ author }: HeaderLinkProps) => {
  const authorCreatedDiff = useMemo(() => {
    if (author?.updated_at) {
      const created = new Date(author?.updated_at as string);
      const diffInDays = differenceInDays(new Date(), created);

      return diffInDays;
    }
  }, [author]);

  return (
    <div className="">
      <Link
        href="/"
        className="text-2xl font-bold hover:underline text-emerald-500 hover:text-emerald-600"
      >
        {author?.username}
      </Link>
      <div className="flex gap-3 text-gray-200 ">
        <p className="hover:underline hover:cursor-pointer text-emerald-500 ">
          follow
        </p>
        <p className="hover:underline hover:cursor-pointer text-emerald-500 ">
          block
        </p>
        <p className="hover:underline hover:cursor-pointer text-emerald-500 ">
          message
        </p>
      </div>
      <div className="flex items-center gap-2 py-1 text-sm font-medium">
        {/* User created */}
        <p>{author?.entry.length} entry -</p>
        {author?.updated_at && (
          <p className="text-sm font-medium">{authorCreatedDiff} days ago</p>
        )}
      </div>
    </div>
  );
};

export default HeaderLink;
