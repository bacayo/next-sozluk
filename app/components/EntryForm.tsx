"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useSupabase } from "../providers/SupabaseProvider";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";
import { useToast } from "./ui/use-toast";
import { Entry } from "@/types/types";

type Entries =
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
        vote: number;
        favorites: {
          created_at: string;
          entryId: string | null;
          id: string | null;
          userId: string | null;
        }[];
        profiles: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        } | null;
      }[];
    }[]
  | null;

interface EntryFormProps {
  params?: {
    slug: string;
  };
  searchParams?: {
    q: string;
  };
  entry?: Entries;
}

const EntryForm = ({ params, searchParams, entry }: EntryFormProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  //* create new entry
  const handleSubmitNewEntry = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (inputRef.current?.value === "" || inputRef.current?.value === null) {
        toast({
          title: "Entry cannot be empty",
          variant: "destructive",
        });
      } else {
        const { data, error, count, status, statusText } = await supabase
          .from("entry")
          .insert([
            {
              text: inputRef.current?.value,
              user_id: session?.user.id as string,
              // topic_id: topicId as string,
              topic_id: entry![0].id,
            },
          ])
          .select();

        console.log({ data, error, status, statusText });

        toast({
          title: "Entry success",
          variant: "success",
        });
        router.refresh();
      }

      //@ts-ignore
      if (inputRef.current?.value) {
        inputRef.current.value = "";
      }
    } catch (error) {}
  };

  //* create new topic with entry
  const handleSubmitNewTopic = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const {
      data: newTopic,
      error: newTopicError,
      count,
      status,
      statusText,
    } = await supabase
      .from("topics")
      .upsert({
        user_id: session?.user.id as string,
        title: searchParams?.q as string,
      })
      .select("*");

    if (!newTopicError) {
      const { data, error } = await supabase
        .from("entry")
        .insert({
          topic_id: newTopic[0].id,
          user_id: session?.user.id as string,
          text: inputRef.current?.value,
        })
        .select("*");
      router.push(`/topic/${newTopic[0].title}`);
    }

    router.refresh();
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
          ref={inputRef}
          placeholder={`Express your thoughts on ${searchParams?.q}`}
          className="h-20 text-gray-200 transition-[height] duration-500 ease-in border-2 focus:h-80 border-neutral-600 focus:border-emerald-600 focus-visible:ring-0 placeholder:text-gray-400"
        />
      </div>
      <Button
        onClick={() => {
          !params ? handleSubmitNewTopic() : handleSubmitNewEntry();
        }}
        className="self-end w-20 text-gray-200 transition bg-emerald-600 hover:bg-emerald-600 hover:text-gray-400"
      >
        Publish
      </Button>
    </div>
  );
};

export default EntryForm;
