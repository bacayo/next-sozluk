"use client";

import React, { useState } from "react";
import { Input } from "../components/ui/Input";
import OAuthButton from "../components/OAuthButton";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const RegisterUsername = ({ session }: { session: Session }) => {
  const supabase = createClientComponentClient<Database>();
  const [username, setUsername] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState(false);
  const router = useRouter();

  return (
    <>
      <Input
        className={`w-full bg-neutral-900 border-0  placeholder:text-gray-400 text-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-0`}
        placeholder="nickname"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p className="pt-1 text-sm font-light text-neutral-300">
        Please assign your nickname.the nickname that will represent you in the
        site
      </p>
      <OAuthButton
        size="sm"
        variant="default"
        label="register"
        onClick={async () => {
          try {
            const { count } = await supabase
              .from("profiles")
              .select("username", { count: "exact" })
              .filter("username", "in", `(${username})`);

            if (count === 0) {
              await supabase.auth.updateUser({
                data: {
                  username: username,
                },
              });

              const { status } = await supabase
                .from("profiles")
                .update({
                  username: username,
                })
                .eq("id", session.user.id)
                .select();

              if (status === 200) {
                await supabase.auth.refreshSession();
                router.push("/");
              }
            } else {
              setNicknameStatus(true);
            }
          } catch (error) {
            throw new Error(error as string);
          }
        }}
      />
      {nicknameStatus && (
        <p className="pt-2 text-red-600">this nickname is taken</p>
      )}
    </>
  );
};

export default RegisterUsername;
