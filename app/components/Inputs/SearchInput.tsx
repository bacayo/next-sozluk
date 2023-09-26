"use client";

import { useCallback, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "../ui/Input";

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

  return (
    // <div className="relative flex items-center sm:w-4/5 lg:w-1/3 ">
    <div className="relative w-full lg:w-1/3">
      <Input
        onChange={searchQuery}
        ref={inputRef}
        className="transition bg-gray-200 border-2 border-green-800 outline-none text-slate-900 focus-visible:ring-0 focus:border-green-400 placeholder:text-slate-900"
        placeholder={placeholder}
      />
      <Link
        onClick={() => {
          if (
            inputRef.current?.value !== null ||
            inputRef.current.value === ""
          ) {
            inputRef.current!.value = "";
            setQuery([]);
          }
        }}
        href={{
          pathname: "/topic",
          query: { q: inputRef.current?.value },
        }}
      >
        <AiOutlineSearch
          size={24}
          className="absolute text-green-500 cursor-pointer right-2 bottom-2"
        />
      </Link>
      {query?.length !== 0 && (
        <ul className="absolute w-full text-sm text-gray-200 border rounded-b border-neutral-500 bg-neutral-800">
          {query?.map((item) => (
            <li
              onClick={() => {
                router.push(`/topic/${item.title}`);
                setQuery([]);
                if (
                  inputRef.current?.value !== "" ||
                  inputRef.current.value !== null
                ) {
                  inputRef.current!.value = "";
                }
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
