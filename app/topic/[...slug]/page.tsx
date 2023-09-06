import Container from "@/app/components/Container";
import EntryForm from "@/app/components/EntryForm";
import Sidebar from "@/app/components/Sidebar";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type TestEntries =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
      entry: {
        created_at: string;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string | null;
        user_id: string;
        vote: number;
        favorites: {
          created_at: string;
          entryId: string | null;
          id: string | null;
          userId: string | null;
        }[];
      }[];
    }[]
  | null;

const TopicPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: topics } = await supabase.from("topics").select("*");

  const { data: entries } = await supabase
    .from("topics")
    .select("*,entry(*,favorites(*))")
    .eq("id", params.slug);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <Container>
      <div className="pt-28" />
      <div className="flex flex-row ">
        <Sidebar topics={topics} />
        <div className="flex-grow text-gray-200">
          <div className="flex flex-col gap-4">
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
            {session && <EntryForm params={params} />}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TopicPage;
