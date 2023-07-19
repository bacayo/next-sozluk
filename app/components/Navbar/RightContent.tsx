"use client";

import Link from "next/link";
import React from "react";

const RightContent = () => {
  return (
    <div className="flex gap-6 cursor-pointer text-neutral-400 ">
      <Link className="hover:underline" href="/login">
        login
      </Link>
      <Link href="/register" className="hover:underline">
        register
      </Link>
    </div>
  );
};

export default RightContent;
