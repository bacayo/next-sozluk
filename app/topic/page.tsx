import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "../components/Container";
import EntryForm from "../components/EntryForm";
import Sidebar from "../components/Sidebar";

interface AddNewTopicPageProps {
  searchParams: {
    q: string;
  };
}

const AddNewTopicPage = async ({ searchParams }: AddNewTopicPageProps) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: topics } = await supabase.from("topics").select("*");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(searchParams.q);

  return (
    <Container>
      <div className="pt-28" />
      <div className="flex flex-row ">
        <Sidebar topics={topics} />
        <div className="flex flex-col flex-grow gap-2 ml-2">
          <h1 className="text-2xl font-bold text-green-600 hover:underline hover:cursor-pointer">
            {searchParams.q}
          </h1>
          <div className="text-sm text-gray-200">
            <p>There is no such thing in this universe, yet</p>
            <p>Someone better populate this</p>
          </div>
          {/* Text area */}
          <div>
            {/* <Textarea /> */}
            {session && <EntryForm searchParams={searchParams} />}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default AddNewTopicPage;
