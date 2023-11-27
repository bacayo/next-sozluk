import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import EntryForm from "../components/EntryForm";

interface AddNewTopicPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
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
    <div className="flex-grow pt-28 lg:ml-64 lg:pl-10 ">
      <div className="flex flex-row flex-grow w-full ">
        {/* <Sidebar topics={topics} /> */}
        <div className="flex flex-col flex-grow gap-2 ml-2 ">
          <h1 className="text-2xl font-bold text-emerald-600 hover:underline hover:cursor-pointer">
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
    </div>
  );
};
export default AddNewTopicPage;
