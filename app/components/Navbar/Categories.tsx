"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { setCategory } from "@/app/redux/slices/setCategorySlice";

import React from "react";

export const categories = [
  {
    label: "popular",
    description: "This property is close to the beach!",
  },
  {
    label: "top",
    description: "This property has windmills!",
  },
  {
    label: "#politics",
    description: "This property is modern!",
  },
  {
    label: "#programming",
    description: "This property is in the countryside!",
  },
];

const Categories = () => {
  const { category } = useAppSelector((state) => state.setCategory);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-row gap-2 pt-4 md:gap-4 lg:gap-20 justify-items-start">
      {categories.map((item) => (
        <p
          onClick={() => {
            dispatch(setCategory(item.label));
          }}
          className={`px-4 border-b-8 cursor-pointer hover:border-b-8 hover:border-green-500 ${
            category === item.label ? "border-green-500" : "border-neutral-800"
          }`}
          key={item.label}
        >
          {item.label}
        </p>
      ))}
    </div>
  );
};

export default Categories;
