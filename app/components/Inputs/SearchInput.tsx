"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Input } from "../ui/Input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { setTopicId } from "@/app/redux/slices/setTopicIdSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  getSearchQueryData,
  resetSearchQueryState,
  setSearchQueryString,
} from "@/app/redux/slices/searchQuerySlice";

interface SearchInputProps {
  placeholder?: string;
}

type Query =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
    }[]
  | null;

const SearchInput = ({ placeholder }: SearchInputProps) => {
  let inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient<Database>();
  const [query, setQuery] = useState<Query | []>([]);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchQuery = useCallback(async () => {
    let { data, error } = await supabase
      .from("topics")
      .select("*")
      .ilike("title", `%${inputRef.current?.value}%`);

    setQuery(data);

    if (inputRef.current?.value === "") {
      setQuery([]);
    }

    return query;
  }, [supabase, query]);

  const handleSearch = useCallback(async () => {
    const { data, error, count, status, statusText } = await supabase
      .from("topics")
      .select("*")
      .filter("title", "in", `(${inputRef.current?.value})`);

    if (data?.length !== 0) {
      const { id } = data![0];
      dispatch(setTopicId(id));
      const params = new URLSearchParams(searchParams.toString());
      params.set("topic", id);
      dispatch(getSearchQueryData(data));
      dispatch(setSearchQueryString(inputRef.current?.value));
      //@ts-ignore
      inputRef.current.value = null;
      setQuery([]);
      return params.toString();
    } else if (data.length === 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("topic", inputRef.current?.value as string);
      dispatch(getSearchQueryData(data));
      dispatch(setSearchQueryString(inputRef.current?.value));
      //@ts-ignore
      inputRef.current.value = null;
      return params.toString();
    }

    setQuery([]);
  }, [dispatch, supabase, searchParams]);

  return (
    // <div className="relative flex items-center sm:w-4/5 lg:w-1/3 ">
    <div className="relative w-full lg:w-1/3">
      <Input
        onChange={searchQuery}
        ref={inputRef}
        className="transition bg-gray-200 border-2 border-green-800 outline-none text-slate-900 focus-visible:ring-0 focus:border-green-400 placeholder:text-slate-900"
        placeholder={placeholder}
      />
      <AiOutlineSearch
        onClick={async () => {
          router.push(pathname + "?" + (await handleSearch()));
          // await handleSearch();
        }}
        size={24}
        className="absolute text-green-500 cursor-pointer right-2 bottom-2"
      />
      {query?.length !== 0 && (
        <ul className="absolute w-full text-sm text-gray-200 border rounded-b border-neutral-500 bg-neutral-800">
          {query?.map((item) => (
            <li
              onClick={async () => {
                dispatch(setTopicId(item.id));
                // dispatch(getSearchQueryData(undefined));
                dispatch(resetSearchQueryState());
                setQuery([]);
                const params = new URLSearchParams(searchParams.toString());
                params.set("topic", item.id);
                router.push(pathname + "?" + params.toString());
                //@ts-ignore
                inputRef.current.value = null;
              }}
              key={item.id}
              className="px-2 py-2 hover:bg-neutral-700 hover:cursor-pointer"
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
