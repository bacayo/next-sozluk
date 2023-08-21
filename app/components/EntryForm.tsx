"use client";

import React, { useRef, useState } from "react";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useSupabase } from "../providers/SupabaseProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setTopicId } from "../redux/slices/setTopicIdSlice";

const EntryForm = () => {
  const { searchQueryString, searchResponse } = useAppSelector(
    (state) => state.searchQuery
  );
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { supabase } = useSupabase();
  const { topicId } = useAppSelector((state) => state.setTopicId);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSubmitNewEntry = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data, error, count, status, statusText } = await supabase
      .from("entry")
      .insert([
        {
          text: inputRef.current?.value,
          user_id: session?.user.id as string,
          topic_id: topicId as string,
        },
      ])
      .select();

    router.refresh();
    //@ts-ignore
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }

    // router.refresh();
  };

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
        title: searchQueryString as string,
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

      const params = new URLSearchParams(searchParams.toString());
      params.set("topic", newTopic[0].id);
      router.push(pathname + "?" + params.toString());
      dispatch(setTopicId(newTopic[0].id));
    }

    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        ref={inputRef}
        placeholder={`Express your thoughts on ${searchQueryString}`}
        className="h-20 text-gray-200 transition-[height] duration-500 ease-in border-2 focus:h-80 border-neutral-600 focus:border-emerald-600 focus-visible:ring-0 placeholder:text-gray-400"
      />
      <Button
        onClick={() => {
          searchResponse?.length === 0
            ? handleSubmitNewTopic()
            : handleSubmitNewEntry();
        }}
        className="self-end w-20 text-gray-200 transition bg-emerald-600 hover:bg-emerald-600 hover:text-gray-400"
      >
        Publish
      </Button>
    </div>
  );
};

export default EntryForm;
