// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MainContent from "./components/MainContent";
import { sub } from "date-fns";

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
  const { data: todayTopic } = await supabase
    .from("topics")
    .select("*,entry(*)")
    .gte("created_at", aDayAgo);

  const { data: topTopic } = await supabase.from("topics").select("*");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <MainContent
      randomEntries={randomEntries}
      session={session}
      topics={topics}
      todayTopics={todayTopic}
    />
  );
}
