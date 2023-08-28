import Container from "@/app/components/Container";
import EntryForm from "@/app/components/EntryForm";
import MainContent from "@/app/components/MainContent";
import Sidebar from "@/app/components/Sidebar";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const TopicPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: topics } = await supabase.from("topics").select("*");

  const { data: entries } = await supabase
    .from("topics")
    .select(`*,entry(*,profiles(*))`)
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
                    <Entry key={item.id} entry={item} />
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
