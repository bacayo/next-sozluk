"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RiGithubFill, RiGoogleFill } from "react-icons/ri";
import AuthInput from "../components/Inputs/AuthInput";
import OAuthButton from "../components/OAuthButton";

import { useRouter } from "next/navigation";
import { useToast } from "../components/ui/use-toast";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const supabase = createClientComponentClient();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // register with email and password

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
        },
      });
      if (user?.identities?.length === 0) {
        toast({
          title: "Email already exist",
          variant: "destructive",
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  };

  return (
    <div className="flex flex-col gap-4">
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
        <AuthInput
          errors={errors}
          id="email"
          register={register}
          required
          placeholder="email"
          type="email"
          description="required. in order to complete registration, provide a valid e-mail address."
        />
        <AuthInput
          errors={errors}
          id="password"
          register={register}
          required
          placeholder="password"
          type="password"
        />
        <OAuthButton
          size="sm"
          variant="default"
          label="register"
          onClick={() => {}}
        />
      </form>

      <OAuthButton
        size="sm"
        label="sign in with google"
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              redirectTo: `${location.origin}/auth/callback`,
            },
          });
        }}
        icon={RiGoogleFill}
      />
      <OAuthButton
        size="sm"
        label="sign in with github"
        onClick={async () => {
          await supabase.auth.signInWithOAuth({
            provider: "github",
          });
        }}
        icon={RiGithubFill}
      />
    </div>
  );
};

export default RegisterForm;
