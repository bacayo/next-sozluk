"use client";

import { useAppSelector } from "@/app/hooks/reduxHooks";
import { Author } from "@/types/types";
import { Session } from "@supabase/supabase-js";
import AuthorEntryComponent from "./AuthorEntryComponent";
import Favorites from "./Favorites";
import AuthorEntryComponentTest, {
  AuthorPage,
} from "./AuthorEntryComponentTest";

export type Result =
  | {
      created_at: string;
      entryId: string | null;
      id: string;
      userId: string | null;
      profiles: {
        username: string | null;
        id: string;
      } | null;
    }[]
  | null;

export type FavEntries =
  | {
      created_at: string;
      entryId: string | null;
      id: string;
      userId: string | null;
      entry: {
        created_at: string;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string | null;
        user_id: string;
        vote: number;
        favorites: {
          created_at: string;
          entryId: string | null;
          id: string;
          userId: string | null;
        }[];
        topics: {
          created_at: string;
          id: string;
          title: string;
          updated_at: string | null;
          user_id: string;
        } | null;
        profiles: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        } | null;
      } | null;
    }[]
  | null;

export type Item = {
  created_at: string;
  id: string;
  text: string;
  topic_id: string;
  updated_at: string | null;
  user_id: string;
  vote: number;
  topics: {
    created_at: string;
    id: string;
    title: string;
    updated_at: string | null;
    user_id: string;
  } | null;
  favorites: {
    created_at: string;
    entryId: string | null;
    id: string | null;
    userId: string | null;
  }[];
};

interface AuthorEntryProps {
  // author: Author;
  session: Session | null;
  favEntries: FavEntries;
  authorPage: AuthorPage;
  username: string;
}

const AuthorEntry = ({
  session,
  favEntries,
  authorPage,
  username,
}: AuthorEntryProps) => {
  const { category } = useAppSelector((state) => state.authorPageCategory);

  return category === "favorites" ? (
    <Favorites favEntries={favEntries} session={session} />
  ) : (
    // <AuthorEntryComponent author={author} session={session} />
    <AuthorEntryComponentTest
      authorPage={authorPage}
      session={session}
      username={username}
    />
  );
};
export default AuthorEntry;
