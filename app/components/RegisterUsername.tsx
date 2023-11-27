"use client";

import React from "react";
import AuthInput from "./Inputs/AuthInput";
import OAuthButton from "./OAuthButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface RegisterUsernameProps {
  session: Session | null;
}

const RegisterUsername = ({ session }: RegisterUsernameProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // register with email and password

    console.log(errors);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ username: formData.username })
        .eq("id", session?.user.id)
        .select("*");
      if (data) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      action="submit"
    >
      <AuthInput
        errors={errors}
        id="username"
        register={register}
        required
        placeholder="username"
        type="text"
        description="the nickname that will represent you in the site. can be 3-35 characters long, can include only letters, numbers and spaces"
      />
      <OAuthButton
        size="sm"
        variant="default"
        label="register"
        onClick={() => {}}
      />
    </form>
  );
};

export default RegisterUsername;
