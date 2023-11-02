import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import Container from "../components/Container";
import { Database } from "@/lib/supabase";
import LoginForm from "./LoginForm";

const LoginPage = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: user } = await supabase
    .from("profiles")
    .select()
    .eq("id", session?.user.id)
    .single();

  return (
    <div className="flex-grow pt-28 lg:ml-64 lg:pl-10 ">
      <p className="py-2 font-bold">Login</p>
      {session && (
        <div className="pb-4 text-sm text-red-700">
          {`just to let you know, you are already logged in as '${user?.username}'`}
        </div>
      )}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
