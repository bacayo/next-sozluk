"use client";

import AppLogo from "@/public/images/eksisozluk_logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Link
      className="shrink-0"
      onClick={() => {
        router.refresh();
      }}
      href="/"
    >
      <Image
        className="cursor-pointer "
        height={150}
        width={150}
        alt="logo"
        src={AppLogo}
      />
    </Link>
  );
};

export default Logo;
