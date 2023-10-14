import { Session } from "@supabase/supabase-js";
import { useCallback } from "react";

export type Favorites = {
  created_at: string;
  entryId: string | null;
  id: string | null;
  userId: string | null;
}[];

export const useSetFavorites = () => {
  const setFavorites = useCallback((favorites: Favorites, session: Session) => {
    const favs = favorites.filter((item) => item?.userId === session?.user.id);
    return favs.length;
  }, []);
  return setFavorites;
};
