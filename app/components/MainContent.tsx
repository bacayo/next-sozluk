"use client";

import { Session } from "@supabase/supabase-js";
import { IEntriesParams } from "../actions/getEntriesByTopicId";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import EntryForm from "./EntryForm";
import Entry from "./Topic/Entry";
import Topic from "./Topic/Topic";
import TopicBox from "./Topic/TopicBox";
import { RandomEntries, EntryT } from "@/types/types";
import { setTopicId } from "../redux/slices/setTopicIdSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MainContentProps {
  randomEntries?: RandomEntries;
  entries?: EntryT;
  searchParams?: IEntriesParams;
  session: Session | null;
}

const MainContent = ({
  randomEntries,
  entries,
  searchParams,
  session,
}: MainContentProps) => {
  const { topicId } = useAppSelector((state) => state.setTopicId);
  const { searchQueryString } = useAppSelector((state) => state.searchQuery);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  if (searchParams!["topic" as keyof typeof searchParams] === topicId)
    return (
      <div className="flex-grow text-gray-200">
        <div className="flex flex-col gap-4">
          <div>
            {entries?.map((entry) => (
              <div key={entry.id}>
                <Topic topic={entry.title} />
                {entry.entry.map((item) => (
                  <Entry key={item.id} entry={item} />
                ))}
              </div>
            ))}
          </div>
          {session && <EntryForm />}
        </div>
      </div>
    );

  if (searchParams!["topic" as keyof typeof searchParams] === undefined) {
    return (
      <TopicBox>
        {randomEntries?.map((item) => (
          <div key={item.id}>
            <Topic
              onClick={() => {
                dispatch(setTopicId(item.topic_id));
                const param = new URLSearchParams(params.toString());
                param.set("topic", item.topic_id as string);
                router.push(pathname + "?" + param);
              }}
              topic={item.topics?.title}
            />
            <Entry entry={item} />
          </div>
        ))}
      </TopicBox>
    );
  }

  return (
    <div className="flex flex-col flex-grow gap-2 ml-2">
      <h1 className="text-2xl font-bold text-green-600 hover:underline hover:cursor-pointer">
        {searchQueryString}
      </h1>
      <div className="text-sm text-gray-200">
        <p>There is no such thing in this universe, yet</p>
        <p>Someone better populate this</p>
      </div>
      {/* Text area */}
      <div>
        {/* <Textarea /> */}
        {session && <EntryForm />}
      </div>
    </div>
  );
};

export default MainContent;
