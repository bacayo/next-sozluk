import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Container from "../components/Container";
import EntryForm from "../components/EntryForm";

interface AddNewTopicPageProps {
  searchParams: {
    q: string;
  };
}

const AddNewTopicPage = async ({ searchParams }: AddNewTopicPageProps) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Container>
      <div className="flex flex-row flex-grow w-full pt-28 ">
        {/* <Sidebar topics={topics} /> */}
        <div className="flex flex-col flex-grow gap-2 ml-2 ">
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
