import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import EntryFormComponent from "../components/EntryFormComponent";
import EntryNotFound from "../components/EntryNotFound";
import SingleEntry from "../components/SingleEntry";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  console.log(slug.length);

  const entryId = slug.length === 2 ? slug[1] : slug[0];

  // const { data: entry } = await supabase
  //   .from("entry")
  //   .select("*,topics(*)")
  //   .eq("id", entryId)
  //   .single();

  const { data: entry } = await supabase
    .from("entry")
    .select("*,topics!inner(*),favorites(*),profiles(*)")
    .eq("id", entryId)
    .single();

  const { data: allEntries } = await supabase
    .from("entry")
    .select("*,topics!inner(*),favorites(*),profiles(*)")
    .eq(
      "topics.title",
      decodeURIComponent(entry?.topics?.title as string).replaceAll("-", " ")
    );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(allEntries);

  //1fa06f9a-432d-4708-bf52-4dc45726a280

  if (!entry) {
    return <EntryNotFound slug={slug} />;
  }

  if (entry && slug.length === 1) {
    return (
      <main className=" lg:ml-64 pt-28">
        {/* Head */}
        <SingleEntry
          entry={entry}
          params={params}
          topicTitle={entry.topics?.title as string}
          session={session}
        />
      </main>
    );
  }

  return (
    <main>
      <div className=" lg:ml-64 pt-28">
        {/* Head */}
        <div className="flex items-center gap-2">
          <Link href={`/topic/${entry?.topics?.title}`}>
            <h3 className="p-2 text-2xl font-bold cursor-pointer text-emerald-600 hover:underline">
              {entry?.topics?.title}
            </h3>
          </Link>
          <div className="text-base font-bold text-gray-200">#{slug}</div>
        </div>
        {/* Entry editor */}
        <EntryFormComponent entry={entry} />
      </div>
    </main>
  );
}
