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

  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: author } = await supabase
    .from("profiles")
    .select("*,entry(*,topics(*),favorites(*))")
    .match({ username: slug })
    .single();

  const session = await getSession();

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
        <AuthorNavbar author={author} />
      </div>
      <main className="pb-6 mt-2">
        {author.entry.map((item) => (
          <AuthorEntry
            key={item.id}
            entry={item}
            session={session}
            author={author}
          />
        ))}
      </main>
    </div>
  );
}
