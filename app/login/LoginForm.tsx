"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthInput from "../components/Inputs/AuthInput";
import OAuthButton from "../components/OAuthButton";
import { RiGithubFill, RiGoogleFill } from "react-icons/ri";
import { useToast } from "../components/ui/use-toast";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // register with email and password

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (user) {
        toast({
          title: "Login succesful",
          variant: "success",
        });
        router.refresh();
        router.push("/");
      }
      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }
      // router.refresh();
      // router.push("/");
    } catch (error) {
      console.log(error);
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
          id="email"
          register={register}
          required
          placeholder="Email"
          type="email"
        />
        <AuthInput
          errors={errors}
          id="password"
          register={register}
          required
          placeholder="Password"
          type="password"
        />
        <OAuthButton size="sm" label="login" onClick={() => {}} />
      </form>

      <OAuthButton
        size="sm"
        label="Login with google"
        onClick={async () => {
          try {
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: `${location.origin}/auth/callback`,
              },
            });

            if (data) {
              toast({
                title: "Login succesful",
                variant: "success",
              });
            }

            router.refresh();
            console.log(data, error);
          } catch (error: any) {
            throw new Error("Something went wrong", error);
          }
        }}
        icon={RiGoogleFill}
      />
      <OAuthButton
        size="sm"
        label="Login with github"
        onClick={async () => {
          try {
            const { data, error } = await supabase.auth.signInWithOAuth({
              provider: "github",
              options: {
                redirectTo: `${location.origin}/auth/callback`,
                // redirectTo: "http://localhost:3000/auth/callback",
              },
            });
            console.log({ data, error });
            if (data) {
              toast({
                title: "Login succesful",
                variant: "success",
              });
            }
          } catch (error: any) {
            throw new Error("Something went wrong", error);
          }
        }}
        icon={RiGithubFill}
      />
    </div>
  );
};

export default LoginForm;
