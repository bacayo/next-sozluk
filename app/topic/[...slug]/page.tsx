import Topic from "@/app/components/Topic/Topic";
import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { format, sub } from "date-fns";
import { cookies } from "next/headers";
import TopicClient from "../components/TopicClient";
import TopicNavbar from "../components/TopicNavbar";
import NoEntry from "../components/NoEntry";

const FROM = 0;
const TO = 9;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    slug: string;
  };
}

const TopicPage = async ({ params, searchParams }: Props) => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { slug } = params;

  //  Calculate 24 hours before the current time
  const aDayAgo = sub(new Date(), { hours: 24 }).toISOString();

  const { data: topics } = await supabase
    .from("topics")
    .select("title")
    .eq("title", decodeURIComponent(params.slug).replaceAll("-", " "))
    .single();

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
        : FROM,
      searchParams.page && Number(searchParams.page) !== 1
        ? Number(searchParams.page) * 10 - 1
        : TO
    );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (
    Number(searchParams.page) > Math.ceil((allEntries?.length as number) / 10)
  ) {
    return (
      <NoEntry
        allEntries={allEntries}
        entries={entries}
        params={params}
        searchParams={searchParams}
        topics={topics}
      />
    );
  }

  if (searchParams.a === "all") {
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
      )
      .order("vote", { ascending: false });

    return (
      <TopicClient
        topics={topics}
        allEntries={allEntries}
        entries={entries}
        params={params}
        searchParams={searchParams}
        session={session}
      />
    );
  }

  if (searchParams.a === "today") {
    const { data: entries } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles(*)")
      .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
      .gte("created_at", aDayAgo)
      .range(
        searchParams.page && Number(searchParams.page) !== 1
          ? Number(searchParams.page) * 10 - 10
          : 0,
        searchParams.page && Number(searchParams.page) !== 1
          ? Number(searchParams.page) * 10 - 1
          : 9
      );

    if (entries?.length === 0) {
      <div className="flex flex-col flex-grow gap-4 pt-28 lg:ml-64 lg:pl-10">
        <TopicNavbar
          topics={topics}
          allEntries={allEntries}
          entries={entries}
          searchParams={searchParams}
        />
      </div>;
    }

    return (
      <TopicClient
        topics={topics}
        allEntries={allEntries}
        entries={entries}
        params={params}
        searchParams={searchParams}
        session={session}
      />
    );
  }

  return (
    <TopicClient
      topics={topics}
      allEntries={allEntries}
      entries={entries}
      params={params}
      searchParams={searchParams}
      session={session}
    />
  );
};

export default TopicPage;
