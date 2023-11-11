"use client";

import { Button } from "@/app/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { ChevronDown } from "lucide-react";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/app/hooks/reduxHooks";

interface FooterProps {
  searchParams: { [key: string]: string | string[] | undefined };
  allEntriesLength: number | null;
  favEntriesCount: number;
}

interface NavButtonProps {
  pathname: string;
  page: number;
  content: string;
}

//«

// query: {
//   page: page > 1 ? page - 1 : 1,
// },

const NavButton = ({ pathname, content, page }: NavButtonProps) => {
  return (
    <Link
      href={{
        pathname,
        // query: query,
        query: {
          page: page,
        },
      }}
    >
      <Button
        className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
        variant="outline"
      >
        {content}
      </Button>
    </Link>
  );
};

const Footer = ({
  searchParams,
  allEntriesLength,
  favEntriesCount,
}: FooterProps) => {
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;

  const { category } = useAppSelector((state) => state.authorPageCategory);

  console.log(category);

  const entryLength = useMemo(() => {
    if (category === "entries") {
      return Math.ceil(allEntriesLength! / 10);
    } else {
      return Math.ceil(favEntriesCount! / 10);
    }
  }, [allEntriesLength, category, favEntriesCount]);

  const pathname = usePathname();

  return (
    <>
      {entryLength > 1 && (
        <footer className="flex items-center justify-between w-full gap-2">
          {searchParams.page !== "1" && searchParams.page && (
            <NavButton
              content="«"
              pathname={pathname}
              page={page > 1 ? page - 1 : 1}
            />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                // className="bg-transparent w-fit h-fit hover:bg-transparent"
                className="flex items-center justify-between w-full text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
              >
                <p className="flex-1 text-center">{page}</p>
                <ChevronDown className="w-4 h-4 text-emerald-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-none w-[8rem]  bg-neutral-800">
              {Array.from({ length: entryLength }, (_, i) => (
                <DropdownMenuGroup key={i}>
                  <Link
                    href={{
                      pathname,
                      query: {
                        page: i + 1,
                      },
                    }}
                  >
                    <DropdownMenuItem className="cursor-pointer focus:bg-neutral-500">
                      <span>{i + 1}</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="">/</span>
          <Button
            variant="outline"
            className="w-full text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
          >
            <Link
              className="w-full"
              href={{
                pathname,
                query: {
                  page: entryLength,
                },
              }}
            >
              {entryLength}
            </Link>
          </Button>
          {searchParams.page !== entryLength.toString() && (
            <NavButton content="»" page={page + 1} pathname={pathname} />
          )}
        </footer>
      )}
    </>
  );
};

export default Footer;
