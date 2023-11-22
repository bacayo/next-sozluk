import { Database } from "@/lib/supabase";
import {
  Session,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { sub } from "date-fns";
import { cookies } from "next/headers";
import NoEntry from "../components/NoEntry";
import TopicClient from "../components/TopicClient";

const FROM = 0;
const TO = 9;

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
  params: {
    slug: string;
  };
}

const TopicPage = async ({ params, searchParams }: Props) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  //  Calculate 24 hours before the current time
  const aDayAgo = sub(new Date(), { hours: 24 }).toISOString();

  console.log(searchParams);

  const { data: topics } = await supabase
    .from("topics")
    .select("title")
    .eq("title", decodeURIComponent(params.slug).replaceAll("-", " "))
    .single();

  const { data: allEntries, count: allEntriesCount } = await supabase
    .from("entry")
    .select("*,topics!inner(*),favorites(*),profiles(*)", {
      count: "exact",
    })
    .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "));

  const { data: entries, count: pageNumberEntryCount } = await supabase
    .from("entry")
    .select("*,topics!inner(*),favorites(*),profiles(*)", { count: "exact" })
    .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
    .order("created_at", { ascending: true })
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

  // Incorrect page number
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
        authorName={session?.user.user_metadata.user_name}
        session={session as Session}
      />
    );
  }

  // Most voted entries
  if (searchParams.a === "all") {
    const { data: entries, count: entryCount } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles(*)", { count: "exact" })
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
        entryCount={entryCount as number}
        authorName={session?.user.user_metadata.user_name}
      />
    );
  }

  // Today entries only
  if (searchParams.a === "today") {
    const { data: entries, count: entryCount } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles(*)", { count: "exact" })
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

    return (
      <TopicClient
        topics={topics}
        allEntries={allEntries}
        entries={entries}
        params={params}
        searchParams={searchParams}
        session={session}
        count={allEntriesCount}
        entryCount={entryCount as number}
        authorName={session?.user.user_metadata.user_name}
      />
    );
  }

  if (searchParams.a === "nicetoday") {
    const { data: entries, count: entryCount } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles(*)", { count: "exact" })
      .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
      .gte("created_at", aDayAgo)
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
        count={allEntriesCount}
        entryCount={entryCount as number}
        authorName={session?.user.user_metadata.user_name}
      />
    );
  }

  // User search for links only
  if (searchParams.a === "links") {
    const { data: linkEntries, count: entryCount } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles(*)", { count: "exact" })
      .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
      .order("created_at", { ascending: true })
      .like("text", "%[https://%")
      .range(
        searchParams.page && Number(searchParams.page) !== 1
          ? Number(searchParams.page) * 10 - 10
          : FROM,
        searchParams.page && Number(searchParams.page) !== 1
          ? Number(searchParams.page) * 10 - 1
          : TO
      );

    return (
      <TopicClient
        topics={topics}
        allEntries={allEntries}
        entries={linkEntries}
        params={params}
        searchParams={searchParams}
        session={session}
        count={allEntriesCount}
        entryCount={entryCount as number}
        authorName={session?.user.user_metadata.user_name}
      />
    );
  }

  if (searchParams.author) {
    const {
      data: myEntries,
      count: myEntriesCount,
      error: myEntriesError,
    } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles!inner(*)", {
        count: "exact",
      })
      .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
      .eq("profiles.username", searchParams.author)
      .order("created_at", { ascending: true });

    return (
      <TopicClient
        topics={topics}
        allEntries={allEntries}
        entries={myEntries}
        params={params}
        searchParams={searchParams}
        session={session}
        count={allEntriesCount}
        entryCount={myEntriesCount as number}
        authorName={session?.user.user_metadata.user_name}
      />
    );
  }

  if (searchParams.keywords) {
    const {
      data: myEntries,
      count: myEntriesCount,
      error: myEntriesError,
    } = await supabase
      .from("entry")
      .select("*,topics!inner(*),favorites(*),profiles!inner(*)", {
        count: "exact",
      })
      .eq("topics.title", decodeURIComponent(params.slug).replaceAll("-", " "))
      .eq(
        "profiles.username",
        decodeURIComponent(String(searchParams.keywords).substring(1))
      )
      .order("created_at", { ascending: true });

    return (
      <TopicClient
        topics={topics}
        allEntries={allEntries}
        entries={myEntries}
        params={params}
        searchParams={searchParams}
        session={session}
        count={allEntriesCount}
        entryCount={myEntriesCount as number}
        authorName={session?.user.user_metadata.user_name}
      />
    );
  }

  // All entries in topic
  return (
    <TopicClient
      topics={topics}
      allEntries={allEntries}
      entries={entries}
      params={params}
      searchParams={searchParams}
      session={session}
      entryCount={allEntriesCount as number}
      authorName={session?.user.user_metadata.user_name}
    />
  );
};

export default TopicPage;
