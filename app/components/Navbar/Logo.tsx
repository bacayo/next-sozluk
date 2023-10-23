"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { setCategory } from "@/app/redux/slices/setNavbarCategory";
// import AppLogo from "@/public/images/eksisozluk_logo.svg";
import AppLogo from "@/public/images/nextjs_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { navbarCategory } = useAppSelector((state) => state.setNavbarCategory);

  return (
    <Link
      className="shrink-0"
      onClick={() => {
        dispatch(setCategory(null));
        if (navbarCategory === null) {
          router.refresh();
        }
      }}
      href="/"
    >
      <Image
        className="cursor-pointer "
        height={80}
        width={80}
        alt="logo"
        src={AppLogo}
      />
    </Link>
  );
};

export default Logo;
