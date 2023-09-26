import EntryForm from "@/app/components/EntryForm";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const TopicPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: entries } = await supabase
    .from("topics")
    .select("*,entry(*,favorites(*),profiles(*))")
    .eq("title", decodeURIComponent(params.slug).replaceAll("-", " "));

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // const { data: topicId } = await supabase
  //   .from("topics")
  //   .select()
  //   .eq("title", decodeURIComponent(params.slug).replaceAll("-", " "));

  return (
    <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10 ">
      <div>
        {entries?.map((entry) => (
          <div key={entry.id}>
            <Topic topic={entry.title} />
            {entry.entry.map((item) => (
              <Entry session={session} key={item.id} entry={item} />
            ))}
          </div>
        ))}
      </div>
      {session && <EntryForm params={params} entry={entries} />}
    </div>
  );
};

export default TopicPage;
