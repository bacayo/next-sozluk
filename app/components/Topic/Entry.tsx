"use client";

import { useSupabase } from "@/app/providers/SupabaseProvider";
import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { FaTwitter, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { TfiFacebook } from "react-icons/tfi";

const Entry = ({ entry }: { entry: any }) => {
  const supabase = createClientComponentClient<Database>();

  const handleVote = async (entryId: string) => {
    await supabase.rpc("increment_entry_vote", { row_id: entryId });
  };

  const handleDecrementVote = async (entryId: string) => {
    await supabase.rpc("decrement_entry_vote", {
      row_id: entryId,
    });
  };

  return (
    <>
      <p className="p-2">{entry.text}</p>
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
            onClick={() => handleVote(entry.id)}
            size={16}
            className="transition cursor-pointer hover:text-green-500"
          />
          <FaChevronDown
            onClick={() => handleDecrementVote(entry.id)}
            size={16}
            className="transition cursor-pointer hover:text-red-700"
          />
        </div>
        <div className="flex flex-row items-center gap-2 text-sm ">
          <p className="text-xs cursor-pointer hover:underline">
            {/* {`${new Date(entry.created_at).toLocaleString()}`} */}
            {entry.created_at}
          </p>
          <p className="text-green-600 cursor-pointer hover:underline">
            {entry.profiles?.username}
          </p>
        </div>
      </div>
    </>
  );
};

export default Entry;
