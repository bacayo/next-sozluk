"use client";

import { Button } from "@/app/components/ui/Button";
import { Textarea } from "@/app/components/ui/Textarea";
import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
} | null;

interface EntryFormComponentProps {
  entry: Entry;
}

const EntryFormComponent = ({ entry }: EntryFormComponentProps) => {
  const [text, setText] = useState(entry?.text);
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleEntryUpdate = async () => {
    try {
      const { status } = await supabase
        .from("entry")
        .update({
          text: text,
          updated_at: new Date().toISOString(),
        })
        .eq("id", entry?.id)
        .select();

      if (status === 200) {
        router.push(`/entry/${entry?.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col px-3 pb-4 bg-neutral-800">
        <div className="flex items-center justify-start h-12 gap-2 ">
          <button className="px-2 py-1 text-sm rounded bg-neutral-700">
            http://
          </button>
          <button className="px-2 py-1 text-sm rounded bg-neutral-700">
            --spoiler--
          </button>
        </div>
        <Textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="h-20 text-gray-200 transition-[height] duration-500 ease-in border-2 focus:h-80 border-neutral-600 focus:border-emerald-600 focus-visible:ring-0 placeholder:text-gray-400"
        />
      </div>
      <Button
        onClick={handleEntryUpdate}
        className="self-end w-20 text-gray-200 transition bg-emerald-600 hover:bg-emerald-600 hover:text-gray-400"
      >
        Publish
      </Button>
    </div>
  );
};

export default EntryFormComponent;
