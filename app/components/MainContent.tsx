"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import {
  getEntriesByTopicId,
  getRandomEntries,
} from "../actions/getEntriesByTopicId";
import { TfiFacebook } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type Entry =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
      entry: {
        created_at: string;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string | null;
        user_id: string;
        profiles: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        } | null;
      }[];
    }[]
  | null;

type RandomEntries =
  | {
      created_at: string | null;
      id: string | null;
      text: string | null;
      topic_id: string | null;
      updated_at: string | null;
      user_id: string | null;
      profiles: {
        avatar_url: string | null;
        id: string;
        updated_at: string | null;
        username: string | null;
      } | null;
      topics: {
        created_at: string;
        id: string;
        title: string;
        updated_at: string | null;
        user_id: string;
      } | null;
    }[]
  | null;

const MainContent = () => {
  const { topicId } = useAppSelector((state) => state.setTopicId);
  const [entry, setEntry] = useState<Entry>();
  const [randomEntries, setRandomEntries] = useState<RandomEntries>();

  useEffect(() => {
    const getEntries = async () => {
      let entries = await getEntriesByTopicId(topicId as string);
      const randomEntries = await getRandomEntries();
      setEntry(entries);
      setRandomEntries(randomEntries);
    };

    getEntries();
  }, [topicId]);

  if (!topicId) {
    return (
      <div className="flex-grow text-gray-200">
        {randomEntries?.map((item) => (
          <div key={item.id}>
            <h1 className="p-2 text-xl font-bold text-green-600 cursor-pointer hover:underline">
              {item.topics?.title}
            </h1>
            <p className="p-2">{item.text}</p>
            <div className="flex flex-row justify-between px-2">
              <div className="flex items-center gap-3">
                <TfiFacebook
                  size={14}
                  className="transition cursor-pointer hover:text-blue-600"
                />
                <FaTwitter
                  size={14}
                  className="transition cursor-pointer hover:text-sky-500"
                />
                <FaChevronUp
                  size={16}
                  className="transition cursor-pointer hover:text-green-500"
                />
                <FaChevronDown
                  size={16}
                  className="transition cursor-pointer hover:text-red-700"
                />
              </div>
              <div className="flex flex-row items-center gap-2 text-sm ">
                <p className="text-xs cursor-pointer hover:underline">
                  {item.created_at}
                </p>
                <p className="text-green-600 cursor-pointer hover:underline">
                  {item.profiles?.username}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex-grow text-gray-200">
      {entry?.map((item) => (
        <h1
          className="p-2 text-xl font-bold text-green-600 cursor-pointer hover:underline"
          key={item.id}
        >
          {item.title.toLowerCase()}
        </h1>
      ))}
      {entry?.map((item) =>
        item.entry.map((i) => (
          <div key={i.id}>
            <p className="p-2">{i.text}</p>
            {/* entry bottom */}
            <div className="flex flex-row justify-between px-2">
              <div className="flex items-center gap-3">
                <TfiFacebook
                  size={14}
                  className="transition cursor-pointer hover:text-blue-600"
                />
                <FaTwitter
                  size={14}
                  className="transition cursor-pointer hover:text-sky-500"
                />
                <FaChevronUp
                  size={16}
                  className="transition cursor-pointer hover:text-green-500"
                />
                <FaChevronDown
                  size={16}
                  className="transition cursor-pointer hover:text-red-700"
                />
              </div>
              <div className="flex flex-row items-center gap-2 text-sm ">
                <p className="text-xs cursor-pointer hover:underline">
                  {i.created_at}
                </p>
                <p className="text-green-600 cursor-pointer hover:underline">
                  {i.profiles?.username}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MainContent;
