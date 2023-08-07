"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppLogo from "@/public/images/eksisozluk_logo.svg";
// import { getRandomEntries } from "@/app/actions/getEntriesByTopicId";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { setCategory } from "@/app/redux/slices/setCategorySlice";
import { setTopicId } from "@/app/redux/slices/setTopicIdSlice";
import { getRandomEntries } from "@/app/actions/getRandomEntries";

const Logo = () => {
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const randomEntries = await getRandomEntries();
    dispatch(setCategory(null));
    dispatch(setTopicId(null));
    return randomEntries;
  };

  return (
    <Link onClick={handleClick} href="/">
      <Image
        className="hidden cursor-pointer lg:flex"
        height={100}
        width={150}
        alt="logo"
        src={AppLogo}
      />
    </Link>
  );
};

export default Logo;
