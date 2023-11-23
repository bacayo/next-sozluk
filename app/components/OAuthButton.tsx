"use client";

import React from "react";
import { Button } from "./ui/Button";
import { IconType } from "react-icons";

interface OAuthButtonProps {
  label: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  size?: "icon" | "default" | "sm" | "lg" | null | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  disabled?: boolean | undefined;
}

const OAuthButton = ({
  icon: Icon,
  label,
  onClick,
  size,
  variant,
  disabled,
}: OAuthButtonProps) => {
  return (
    <Button
      className="transition bg-emerald-600 text-neutral-200 hover:bg-green-700 hover:text-neutral-300"
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />} {label}
    </Button>
  );
};

export default OAuthButton;
