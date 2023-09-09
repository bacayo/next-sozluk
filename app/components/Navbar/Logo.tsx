"use client";

import AppLogo from "@/public/images/eksisozluk_logo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="cursor-pointer lg:flex"
        height={100}
        width={150}
        alt="logo"
        src={AppLogo}
      />
    </Link>
  );
};

export default Logo;
