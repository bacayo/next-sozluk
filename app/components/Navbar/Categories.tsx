"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { setCategory } from "@/app/redux/slices/setNavbarCategory";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const categories = [
  {
    label: "today",
  },
  {
    label: "popular",
  },
  {
    label: "top",
  },
  {
    label: "#politics",
  },
  {
    label: "#programming",
  },
];

// type Categories = "popular" | "top" | "politics" | "programming";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { navbarCategory } = useAppSelector((state) => state.setNavbarCategory);
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-1 pt-4 md:gap-4 lg:gap-2 justify-items-start">
      {categories.map((item) => (
        <Link
          href={{
            pathname,
          }}
          onClick={() => {
            dispatch(setCategory(item.label));
          }}
          className={`md:px-4 text-sm md:text-base md:border-b-8 cursor-pointer hover:md:border-b-8 hover:md:border-green-500 ${
            navbarCategory === item.label
              ? "md:border-green-500"
              : "md:border-neutral-800"
          }`}
          key={item.label}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default Categories;
