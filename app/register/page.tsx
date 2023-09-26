import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Container from "../components/Container";
import RegisterForm from "./RegisterForm";
import { Database } from "@/lib/supabase";

const RegisterPage = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="pt-28">
      <Container>
        <p className="py-2 text-lg font-bold">Register</p>
        <RegisterForm />
      </Container>
    </div>
  );
};

export default RegisterPage;
