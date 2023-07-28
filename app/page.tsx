// import getCurrentUser from "./actions/getCurrentUser";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "./components/Container";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

interface IParams {
  listingId?: string;
}

export default async function Home({ params }: { params: IParams }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  let { data: topics, error } = await supabase.from("topics").select("*");

  return (
    <Container>
      <div className="pt-28" />
      <div className="flex flex-row ">
        <Sidebar topics={topics} />
        <MainContent />
      </div>
    </Container>
  );
}
