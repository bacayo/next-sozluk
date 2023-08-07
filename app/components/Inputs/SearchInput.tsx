"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Input } from "../ui/Input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { setTopicId } from "@/app/redux/slices/setTopicIdSlice";
import { useRouter } from "next/navigation";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient<Database>();
  const [query, setQuery] = useState<Query | []>([]);
  const dispatch = useAppDispatch();
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
      <AiOutlineSearch
        size={24}
        className="absolute text-green-500 cursor-pointer right-2 bottom-2"
      />
      {query?.length !== 0 && (
        <ul className="absolute w-full text-sm text-gray-200 border rounded-b border-neutral-500 bg-neutral-800">
          {query?.map((item) => (
            <li
              onClick={() => {
                dispatch(setTopicId(item.id));
                setQuery([]);
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

// <div className="z-40 w-full ">
//   {/* <div className="gap-1"> */}
//   {/* 👇 Add "relative" class here */}
//   <form className="relative">
//     {/* <SearchDropdown /> */}
//     {/* <input
//       enterKeyHint="search"
//       type="search"
// className={`w-full bg-white px-4 py-2 text-gray-700  z-10 border focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40`}
//       className=""
//       placeholder="🔍 Search for products"
//     /> */}
//     <Input
//       ref={inputRef}
//       onChange={(e) => e.target.value}
//       className="relative transition bg-gray-200 border-2 border-green-800 outline-none text-slate-900 focus-visible:ring-0 focus:border-green-400 placeholder:text-slate-900"
//       placeholder={placeholder}
//     />
//     <ul className="absolute w-full overflow-hidden bg-white border-b border-l border-r rounded-bl-3xl rounded-br-3xl focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
//       {/* 👆 Consider to add "overflow-hidden" class here */}
//       <li className="p-2 px-4 text-gray-700 border-gray-300 cursor-pointer hover:bg-blue-400">
//         sadsad
//       </li>
//     </ul>
//   </form>
//   {/* </div> */}
// </div>
