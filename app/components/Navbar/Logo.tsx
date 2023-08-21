"use client";

import AppLogo from "@/public/images/eksisozluk_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { getRandomEntries } from "@/app/actions/getRandomEntries";
import { useAppDispatch } from "@/app/hooks/reduxHooks";
import { getSearchQueryData } from "@/app/redux/slices/searchQuerySlice";
import { setCategory } from "@/app/redux/slices/setCategorySlice";
import { setTopicId } from "@/app/redux/slices/setTopicIdSlice";

const Logo = () => {
  const dispatch = useAppDispatch();

  const handleClick = async () => {
    const randomEntries = await getRandomEntries();
    dispatch(setCategory(null));
    dispatch(setTopicId(null));
    dispatch(getSearchQueryData(undefined));
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
