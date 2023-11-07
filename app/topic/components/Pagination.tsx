"use client";

import { Button } from "@/app/components/ui/Button";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/DropdownMenu";
import { ChevronDown } from "lucide-react";

interface PaginationProps {
  searchParams: { [key: string]: string | string[] | undefined };
  page: number;
  pathname: string;
  selectedFilter: string;
  entryLength: number;
}

const Pagination = ({
  searchParams,
  page,
  pathname,
  selectedFilter,
  entryLength,
}: PaginationProps) => {
  return (
    <div className="flex flex-row items-center justify-end gap-2 md:justify-center ">
      {searchParams.page !== "1" && searchParams.page && (
        <Link
          href={{
            pathname,
            query: {
              ...(selectedFilter && { a: selectedFilter }),
              page: page > 1 ? page - 1 : 1,
            },
          }}
        >
          <Button
            size="sm"
            className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
            variant="outline"
          >
            «
          </Button>
        </Link>
      )}
      {/* Left handside */}
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="default"
              // className="bg-transparent w-fit h-fit hover:bg-transparent"
              className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
            >
              <p>{page}</p>
              <ChevronDown className="w-4 h-4 ml-4 text-emerald-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-16 border-none bg-neutral-800">
            {Array.from({ length: entryLength }, (_, i) => (
              <DropdownMenuGroup key={i}>
                <Link
                  href={{
                    pathname,
                    query: {
                      // page: page + 1,
                      ...(selectedFilter && { a: selectedFilter }),
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
      </div>
      {/* Right handside */}
      <div className="text-sm">/</div>
      <div>
        <Link
          href={{
            pathname,
            query: {
              // page: page + 1,
              ...(selectedFilter && { a: selectedFilter }),
              page: entryLength,
            },
          }}
        >
          <Button
            variant="outline"
            size="sm"
            className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
          >
            {entryLength}
          </Button>
        </Link>
      </div>
      {searchParams.page !== entryLength.toString() && (
        <Link
          href={{
            pathname,
            query: {
              // page: page + 1,
              ...(selectedFilter && { a: selectedFilter }),
              page: page + 1,
            },
          }}
        >
          <Button
            size="sm"
            className="text-gray-400 bg-transparent hover:bg-neutral-800 border-neutral-800"
            variant="outline"
          >
            »{" "}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
