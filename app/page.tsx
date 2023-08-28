// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "./components/Container";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { IEntriesParams } from "./actions/getEntriesByTopicId";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: topics } = await supabase.from("topics").select("*");

  const { data: randomEntries } = await supabase
    .from("random_entries")
    .select("*,profiles(*),topics(*)");

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  return (
    <Container>
      <div className="pt-28" />
      <div className="flex flex-row ">
        <Sidebar topics={topics} />
        <MainContent randomEntries={randomEntries} />
      </div>
    </Container>
  );
}
