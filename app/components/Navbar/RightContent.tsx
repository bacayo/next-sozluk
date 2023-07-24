"use client";

import { Session, User } from "@supabase/supabase-js";
import { RiAccountCircleLine } from "react-icons/ri";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSupabase } from "@/app/providers/SupabaseProvider";

interface RightContentProps {
  currentUser?: User | undefined;
  session: Session | null;
}

const RightContent = ({ session }: RightContentProps) => {
  const router = useRouter();

  // const supabase = createClientComponentClient();

  const handleSignout = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  // const session = false;

  const { supabase } = useSupabase();

  // console.log(session);

  return (
    <div className="flex gap-6 text-neutral-300 ">
      {!session ? (
        <>
          <div
            onClick={() => {
              router.push("/register");
            }}
            className="transition cursor-pointer hover:underline hover:text-green-700"
          >
            register
          </div>
          <div
            onClick={() => {
              router.push("/login");
            }}
            className="transition cursor-pointer hover:underline hover:text-green-700"
          >
            login
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 transition cursor-pointer hover:text-green-700 ">
            <RiAccountCircleLine size={24} />
            <p>me</p>
          </div>
          <p
            onClick={handleSignout}
            className="transition cursor-pointer hover:text-green-700"
          >
            Logout
          </p>
        </>
      )}
    </div>
  );
};

export default RightContent;
