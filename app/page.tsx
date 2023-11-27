// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { sub } from "date-fns";
import { cookies } from "next/headers";
import MainContent from "./components/MainContent";
import AuthInput from "./components/Inputs/AuthInput";
import OAuthButton from "./components/OAuthButton";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";
import RegisterUsername from "./components/RegisterUsername";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const aDayAgo = sub(new Date(), { hours: 24 }).toISOString();

  const { data: randomEntries } = await supabase
    .from("random_entries")
    .select("*,favorites(*),topics(*),profiles(*)");

  const { data: topics } = await supabase.from("topics").select("*,entry(*)");
  const { data: todayTopic, count: todayTopicCount } = await supabase
    .from("topics")
    .select("*,entry(*)", { count: "exact" })
    .gte("created_at", aDayAgo);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: newUser } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id)
    .single();

  return (
    <>
      {newUser?.username ? (
        <MainContent
          randomEntries={randomEntries}
          session={session}
          topics={topics}
          todayTopics={todayTopic}
          todayTopicCount={todayTopicCount as number}
        />
      ) : (
        <div className="flex-grow mx-auto pt-60 lg:ml-64 lg:pl-10 ">
          <RegisterUsername session={session} />
        </div>
      )}
    </>
  );
}
