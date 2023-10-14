"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { Button } from "@/app/components/ui/Button";
import { Favorites } from "@/app/hooks/useSetFavorites";
import { Result } from "./AuthorEntry";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface FavoriteDropdownMenuProps {
  favorites: Favorites;
  entryId: string;
}

async function getFavorites(entryId: string) {
  const supabase = createClientComponentClient<Database>();

  const { data: favoritesList } = await supabase
    .from("favorites")
    .select("*,profiles(username,id)")
    .eq("entryId", entryId);
  return favoritesList;
}

const FavoriteDropdownMenu = ({
  favorites,
  entryId,
}: FavoriteDropdownMenuProps) => {
  const [userFavorites, setUserFavorites] = useState<Result>();
  const [loading, setLoading] = useState(false);

  const onLoadUserFavorites = async (entryId: string) => {
    setLoading(true);
    try {
      const results = await getFavorites(entryId);
      setUserFavorites(results);
      setLoading(false);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu
      onOpenChange={() => {
        onLoadUserFavorites(entryId);
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="bg-transparent border-none w-fit h-fit text-emerald-500 hover:text-emerald-500 hover:bg-transparent"
        >
          <span>{favorites.length}</span>
        </Button>
      </DropdownMenuTrigger>
      {loading ? (
        <DropdownMenuContent className="w-56 shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 ">
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer focus:bg-neutral-500">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="bg-transparent border-none w-fit h-fit text-emerald-500 hover:text-emerald-500 hover:bg-transparent"
              >
                <Loader2 className="w-4 h-4 mr-2 animate-spin " />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent className="flex flex-col w-56 gap-1 overflow-y-auto shadow shadow-neutral-700 border-neutral-800 bg-neutral-800 max-h-80 ">
          {userFavorites?.map((item) => (
            <section key={item.id} className="text-sm text-emerald-500">
              <Link
                href={`/author/${item.profiles?.username}`}
                className="px-2 hover:cursor-pointer hover:underline"
              >
                @{item.profiles?.username}
              </Link>
            </section>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default FavoriteDropdownMenu;
