"use client";

import React, { useState } from "react";
import { Author } from "./HeaderLink";

type Navbar = "entries" | "statistics" | "favorites";

interface AuthorNavbarProps {
  author: Author;
}

const AuthorNavbar = ({ author }: AuthorNavbarProps) => {
  const [category, setCategory] = useState<Navbar>("entries");

  return (
    <>
      <ul className="flex gap-2 text-base font-semibold text-emerald-500 ">
        <li
          onClick={() => setCategory("entries")}
          className={`px-2  border-green-500 hover:cursor-pointer hover:underline ${
            category === "entries" ? "border-b-2" : ""
          }`}
        >
          entries
        </li>
        <li
          onClick={() => setCategory("favorites")}
          className={`px-2  border-green-500 hover:cursor-pointer hover:underline ${
            category === "favorites" ? "border-b-2" : ""
          }`}
        >
          favorites
        </li>
        <li onClick={() => setCategory("statistics")}>statistics</li>
      </ul>
      <hr className="w-full border-neutral-700" />
      <p className="mt-2 text-lg font-bold cursor-pointer text-emerald-500 hover:underline">entries({author?.entry.length})</p>
    </>
  );
};

export default AuthorNavbar;
