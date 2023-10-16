import { Database } from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { getSession } from "@/app/actions/getCurrentUser";
import { notFound } from "next/navigation";
import AuthorEntry from "../components/AuthorEntry";
import AuthorNavbar from "../components/AuthorNavbar";
import HeaderLink from "../components/HeaderLink";

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
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

  if (!author) {
    notFound();
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
          author={author}
          session={session}
          favEntries={favEntries}
        />
      </main>
    </div>
  );
}
