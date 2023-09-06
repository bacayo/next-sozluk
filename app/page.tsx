// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "./components/Container";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import Topic from "./components/Topic/Topic";
import Entry from "./components/Topic/Entry";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: topics } = await supabase.from("topics").select("*");

  const { data: randomEntries } = await supabase
    .from("random_entries")
    .select("*,favorites(*),topics(*),profiles(*)");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Container>
      <div className="pt-28" />
      <div className="flex flex-row ">
        <Sidebar topics={topics} />
        <MainContent randomEntries={randomEntries} session={session} />
      </div>
    </Container>
  );
}
