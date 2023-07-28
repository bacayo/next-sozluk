import { Database } from "@/lib/supabase";
import {
  createServerComponentClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createClientComponentClient<Database>();

export async function getEntriesByTopicId(topic_id: string) {
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

export async function getRandomEntries() {
  try {
    const { data: randomEntries } = await supabase
      .from("random_entries")
      .select("*,profiles(*),topics(*)");

    console.log(randomEntries);
    return randomEntries;
  } catch (error) {
    console.log("Random Entry Error", error);
  }
}
