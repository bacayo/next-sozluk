import { Database } from "@/lib/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface IEntriesParams {
  topic_id?: string;
  topicName?: string;
}

export async function getEntriesByTopicId({ topic_id }: IEntriesParams) {
  const supabase = createClientComponentClient<Database>();
  try {
    let query: any = {};

    query.topic_id = topic_id;

    console.log(query);

    const { data: entries } = await supabase
      .from("topics")
      .select(`*,entry(*,profiles(*))`)
      .eq("id", query);

    return entries;
  } catch (error) {
    console.log("Topic Id Error", error);
  }
}
