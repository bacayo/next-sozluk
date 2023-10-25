import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { getSession } from "@/app/actions/getCurrentUser";
import AuthorEntry from "../components/AuthorEntry";
import AuthorNavbar from "../components/AuthorNavbar";
import HeaderLink from "../components/HeaderLink";
import Footer from "../components/Footer";

interface AuthorPageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

const FROM = 0;
const TO = 9;

export default async function AuthorPage({
  params,
  searchParams,
}: AuthorPageProps) {
  const { slug } = params;

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });

  const { data: author } = await supabase
    .from("profiles")
    .select("*,entry(*,topics(*),favorites(*))")
    .match({ username: slug })
    .single();

  const { data: authorPage, error: authorPageErr } = await supabase
    .from("entry")
    .select("*,topics(*),favorites(*),profiles!inner(*)")
    .eq("profiles.username", slug)
    .range(
      searchParams.page && Number(searchParams.page) !== 1
        ? Number(searchParams.page) * 10 - 10
        : FROM,
      searchParams.page && Number(searchParams.page) !== 1
        ? Number(searchParams.page) * 10 - 1
        : TO
    )
    .order("created_at", { ascending: false });

  const { count } = await supabase
    .from("entry")
    .select("*,topics(*),favorites(*),profiles!inner(*)", { count: "exact" })
    .eq("profiles.username", slug);

  console.log(count);

  const session = await getSession();

  const { data: favProf } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", slug)
    .single();

  const { data: favEntries, error } = await supabase
    .from("favorites")
    .select("*,entry(*,favorites(*),topics(*),profiles(*))")
    .eq("userId", favProf?.id)
    .order("created_at", { ascending: true });

  if (authorPage?.length === 0) {
    return (
      <div className="lg:ml-64 lg:pl-10 pt-28 ">
        <h3 className="pt-4 text-2xl font-bold text-gray-200">
          page not found
        </h3>
        <p>
          the page you requested was not found. you may return to home page or
          keep looking using advanced search.{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="lg:ml-64 lg:pl-10 pt-28 ">
      {/* Head */}
      <div>
        {/* Commands */}
        <HeaderLink author={author} />
        {/* Entry List */}
        <AuthorNavbar author={author} favEntries={favEntries} />
      </div>
      <main className="pb-6 mt-2">
        <AuthorEntry
          // author={author}
          authorPage={authorPage}
          username={slug}
          session={session}
          favEntries={favEntries}
        />
        <Footer searchParams={searchParams} allEntriesLength={count} />
      </main>
    </div>
  );
}
