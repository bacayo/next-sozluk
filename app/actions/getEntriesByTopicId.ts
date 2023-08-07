import { Database } from "@/lib/supabase";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getEntriesByTopicId(topic_id: string) {
  const supabase = createClientComponentClient<Database>();
  try {
    const { data: entries } = await supabase
      .from("topics")
      .select(`*,entry(*,profiles(*))`)
      .eq("id", topic_id);

    return entries;
  } catch (error) {
    console.log("Topic Id Error", error);
  }
}

// export async function getRandomEntries() {
//   const supabase = createServerComponentClient<Database>({ cookies });
//   try {
//     const { data: randomEntries } = await supabase
//       .from("random_entries")
//       .select("*,profiles(*),topics(*)");

//     return randomEntries;
//   } catch (error) {
//     console.log("Random Entry Error", error);
//   }
// }
