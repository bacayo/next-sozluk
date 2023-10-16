export type EntryT =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
      entry: {
        created_at: string;
        id: string;
        text: string;
        topic_id: string;
        updated_at: string | null;
        user_id: string;
        profiles: {
          avatar_url: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        } | null;
      }[];
    }[]
  | null;

export type Entry = {
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

export type Author = {
  avatar_url: string | null;
  id: string;
  updated_at: string | null;
  username: string | null;
  entry: {
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
  }[];
} | null;

export type RandomEntries =
  | {
      created_at: string | null;
      id: string | null;
      text: string | null;
      topic_id: string | null;
      updated_at: string | null;
      user_id: string | null;
      favorites: {}[];
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
    }[]
  | null;

export type Topics =
  | {
      created_at: string;
      id: string;
      title: string;
      updated_at: string | null;
      user_id: string;
    }[]
  | null;

export type FavoritedAuthorEntries =
  | {
      avatar_url: string | null;
      id: string;
      updated_at: string | null;
      username: string | null;
      favorites: {
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
        } | null;
      }[];
    }[]
  | null;
