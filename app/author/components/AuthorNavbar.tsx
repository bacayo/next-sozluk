"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { setCategory } from "@/app/redux/slices/authorPageCategorySlice";
import { Author } from "./HeaderLink";
import { FavEntries } from "./AuthorEntry";

interface AuthorNavbarProps {
  author: Author;
  favEntries: FavEntries;
}

const AuthorNavbar = ({ author, favEntries }: AuthorNavbarProps) => {
  const { category } = useAppSelector((state) => state.authorPageCategory);
  const dispatch = useAppDispatch();

  return (
    <>
      <ul className="flex gap-2 text-base font-semibold text-emerald-500 ">
        <li
          onClick={() => dispatch(setCategory("entries"))}
          className={`px-2  border-green-500 hover:cursor-pointer hover:underline ${
            category === "entries" ? "border-b-2" : ""
          }`}
        >
          entries
        </li>
        <li
          onClick={() => dispatch(setCategory("favorites"))}
          className={`px-2  border-green-500 hover:cursor-pointer hover:underline ${
            category === "favorites" ? "border-b-2" : ""
          }`}
        >
          favorites
        </li>
        <li onClick={() => dispatch(setCategory("statistics"))}>statistics</li>
      </ul>
      <hr className="w-full border-neutral-700" />
      <p className="mt-2 text-lg font-bold cursor-pointer text-emerald-500 hover:underline">
        {category === "entries" ? (
          <span>entries({author?.entry.length})</span>
        ) : favEntries!.length > 0 ? (
          <span>favorites ({favEntries?.length})</span>
        ) : (
          <span className="text-sm">nothing to see here</span>
        )}
      </p>
    </>
  );
};

export default AuthorNavbar;
