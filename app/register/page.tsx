import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Container from "../components/Container";
import RegisterForm from "./RegisterForm";
import { Database } from "@/lib/supabase";

const RegisterPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex-grow pt-28 lg:ml-64 lg:pl-10 ">
      <p className="py-2 text-lg font-bold">Register</p>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
