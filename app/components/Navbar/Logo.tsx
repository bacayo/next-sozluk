import React from "react";
import Image from "next/image";
import Link from "next/link";
import AppLogo from "@/public/images/eksisozluk_logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="hidden cursor-pointer lg:flex"
        height={100}
        width={150}
        alt="logo"
        // src="/images/logo.png"
        src={AppLogo}
      />
    </Link>
  );
};

export default Logo;
