import { Database } from "@/lib/supabase";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getRandomEntries() {
  const supabase = createClientComponentClient<Database>();
  try {
    const { data: randomEntries } = await supabase
      .from("random_entries")
      .select("*,profiles(*),topics(*)");

    return randomEntries;
  } catch (error) {
    console.log("Random Entry Error", error);
  }
}
