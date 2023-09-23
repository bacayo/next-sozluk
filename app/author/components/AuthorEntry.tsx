"use client";

import { Session } from "@supabase/supabase-js";
import { format } from "date-fns";
import Link from "next/link";
import React, { useMemo } from "react";
import { FaChevronDown, FaChevronUp, FaTwitter } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { TfiFacebook } from "react-icons/tfi";

type Author = {
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
    topics: {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
    } | null;
    favorites: {
      created_at: string;
      entryId: string | null;
      id: string | null;
      userId: string | null;
    }[];
  }[];
} | null;

type Entry = {
  created_at: string;
  id: string;
  text: string;
  topic_id: string;
  updated_at: string | null;
  user_id: string;
  vote: number;
  topics: {
    created_at: string;
    id: string;
    title: string;
    updated_at: string | null;
    user_id: string;
  } | null;
  favorites: {
    created_at: string;
    entryId: string | null;
    id: string | null;
    userId: string | null;
  }[];
};

interface AuthorEntryProps {
  author: Author;
  entry: Entry;
  session: Session | null;
}

const AuthorEntry = ({ author, entry, session }: AuthorEntryProps) => {
  const formattedDate = useMemo(() => {
    const entryDate = new Date(entry?.created_at);
    const result = format(entryDate, "MMM d, yyyy hh:mm aaaa");
    return result;
  }, [entry]);

  return (
    <div className="py-2 ">
      <Link
        className="text-xl font-bold cursor-pointer text-emerald-500 hover:underline"
        href={`/topic/${entry.topics?.id}`}
      >
        {entry.topics?.title}
      </Link>
      <p>{entry.text}</p>
      {/* Socials */}
      <div className="flex flex-row justify-between mt-2">
        <div className="flex items-center gap-3">
          <TfiFacebook
            title="share to facebook"
            size={14}
            className="transition cursor-pointer hover:text-blue-600"
          />
          <FaTwitter
            title="tweet this in twitter"
            size={14}
            className="transition cursor-pointer hover:text-sky-500"
          />
          <FaChevronUp
            title="nice"
            size={16}
            className="transition cursor-pointer hover:text-green-500"
          />
          <FaChevronDown
            title="awful"
            size={16}
            className="transition cursor-pointer hover:text-red-700"
          />
          {session && (
            <>
              {/* Add or remove favorites */}
              <FiStar
                size={16}
                className={`transition-colors cursor-pointer hover:text-emerald-400 hover:fill-emerald-400 `}
              />
              <p className="text-sm cursor-pointer text-emerald-400">
                {/* {entry.profiles.favorites.length} */}
                {entry.favorites.length}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-row items-center gap-2 text-sm ">
          <p className="text-xs cursor-pointer hover:underline">
            {formattedDate}
          </p>
          <Link
            // onClick={() => {
            //   router.push(`/author/${entry?.profiles.username}/`);
            // }}
            href={`/author/${author?.username}`}
            className="cursor-pointer text-emerald-500 hover:underline"
          >
            {author?.username}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthorEntry;
