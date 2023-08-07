// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "./components/Container";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

interface IParams {
  topicId: string | null;
}

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: topics, error } = await supabase.from("topics").select("*");
  // const randomEntries = await getRandomEntries();

  const { data: randomEntries } = await supabase
    .from("random_entries")
    .select("*,profiles(*),topics(*)");

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
