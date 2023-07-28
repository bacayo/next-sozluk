import React from "react";
import Container from "../components/Container";
import LoginForm from "./LoginForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const LoginPage = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Container>
      <div className="pt-28">
        <p className="py-2 font-bold">Login</p>
        <LoginForm />
      </div>
    </Container>
  );
};

export default LoginPage;
