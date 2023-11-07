"use client";

import { Button } from "@/app/components/ui/Button";
import React from "react";

interface ShowAllButtonProps {
  count: number;
  onClick: () => void;
}

const ShowAllButton = ({ count, onClick }: ShowAllButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size="default"
      className="w-full text-emerald-500 bg-neutral-800 hover:bg-neutral-700"
    >
      show all ({count} entries)
    </Button>
  );
};

export default ShowAllButton;
