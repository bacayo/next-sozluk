// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MainContent from "./components/MainContent";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: randomEntries } = await supabase
    .from("random_entries")
    .select("*,favorites(*),topics(*),profiles(*)");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <MainContent randomEntries={randomEntries} session={session} />;
}
