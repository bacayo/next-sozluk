import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { sub } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import MainContent from "./components/MainContent";

export default async function Home({ params }: { params: { slug: string } }) {
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

  if (session && !session?.user.user_metadata.username) {
    redirect("/register");
  }

  return (
    <MainContent
      randomEntries={randomEntries}
      session={session}
      topics={topics}
      todayTopics={todayTopic}
      todayTopicCount={todayTopicCount as number}
      params={params}
    />
  );
}
