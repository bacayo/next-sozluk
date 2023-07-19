"use client";

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Input } from "../ui/Input";

interface SearchInputProps {
  placeholder?: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    // <div className="relative flex items-center sm:w-4/5 lg:w-1/3 ">
    <div className="relative flex items-center w-full lg:w-1/3 ">
      <Input
        className="transition bg-gray-200 border-2 border-green-800 outline-none text-slate-900 focus-visible:ring-0 focus:border-green-400 placeholder:text-slate-900"
        placeholder={placeholder}
      />
      <div className="absolute flex items-center justify-center right-2 ">
        <AiOutlineSearch size={24} className="text-green-500 cursor-pointer " />
      </div>
    </div>
  );
};

export default SearchInput;
