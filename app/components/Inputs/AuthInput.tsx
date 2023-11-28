"use client";

import React from "react";
import { Input } from "../ui/Input";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface AuthInputProps {
  id: string;
  type?: React.HTMLInputTypeAttribute;
  register: UseFormRegister<FieldValues>;
  disabled?: boolean;
  errors: FieldErrors;
  required: boolean;
  placeholder?: string;
  description?: string;
}

const AuthInput = ({
  id,
  type,
  errors,
  disabled,
  register,
  required,
  placeholder,
  description,
}: AuthInputProps) => {
  return (
    <div>
      <Input
        className={`w-full bg-neutral-900 border-0  placeholder:text-gray-400 text-gray-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-0
      ${errors[id] ? "border-red-700" : "border-neutral-950"}
      ${errors[id] ? "focus:border-red-500" : "focus:border-green-300 border-2"}
      `}
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
      />
      <p className="pt-1 text-sm font-light text-neutral-300">{description}</p>
    </div>
  );
};

export default AuthInput;
