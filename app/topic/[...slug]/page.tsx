import EntryForm from "@/app/components/EntryForm";
import Entry from "@/app/components/Topic/Entry";
import Topic from "@/app/components/Topic/Topic";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import TopicNavbar from "../components/TopicNavbar";
import { notFound } from "next/navigation";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    slug: string;
  };
}

const TopicPage = async ({ params, searchParams }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // const { data: test } = await supabase
  //   .from("topics")
  //   .select("*,topics!inner(*),favorites(*),profiles(*)")
  //   .eq("title", decodeURIComponent(params.slug).replaceAll("-", " "));

  const { data: allEntries } = await supabase
    .from("entry")
    .select("*,topics!inner(*),favorites(*),profiles(*)")
    .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "));

  const { data: entries } = await supabase
    .from("entry")
    .select("*,topics!inner(*),favorites(*),profiles(*)")
    .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
    .range(
      searchParams.page && Number(searchParams.page) !== 1
        ? Number(searchParams.page) * 10 - 10
        : 0,
      searchParams.page && Number(searchParams.page) !== 1
        ? Number(searchParams.page) * 10 - 1
        : 9
    );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    Number(searchParams.page) > Math.ceil((allEntries?.length as number) / 10)
  ) {
    return (
      <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10">
        <p>Content not there</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10">
      <div>
        <Topic topic={entries![0].topics?.title} />
        <TopicNavbar searchParams={searchParams} allEntries={allEntries} />
      </div>
      <div>
        {entries?.map((entry) => (
          <div key={entry.id}>
            <Entry entry={entry} session={session} />
          </div>
        ))}
      </div>
      {session && (
        <EntryForm
          params={params}
          searchParams={searchParams}
          entry={entries}
        />
      )}
    </div>
  );
};

export default TopicPage;
