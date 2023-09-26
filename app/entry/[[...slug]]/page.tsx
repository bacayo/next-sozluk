import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import EntryFormComponent from "../components/EntryFormComponent";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const supabase = createServerComponentClient<Database>({ cookies });

  console.log(slug[1]);

  const { data: entry } = await supabase
    .from("entry")
    .select("*,topics(*)")
    .eq("id", slug[1])
    .single();
  console.log(entry);

  return (
    <div className=" lg:ml-64">
      {/* Head */}
      <div className="flex items-center gap-2">
        <Link href={`/topic/${entry?.topics?.title}`}>
          <h3 className="p-2 text-2xl font-bold cursor-pointer text-emerald-600 hover:underline">
            {entry?.topics?.title}
          </h3>
        </Link>
        <div className="text-base font-bold text-gray-200">#{slug[1]}</div>
      </div>
      {/* Entry editor */}
      <EntryFormComponent entry={entry} />
    </div>
  );
}
