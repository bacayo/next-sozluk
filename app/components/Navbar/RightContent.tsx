"use client";

import { Session, User } from "@supabase/supabase-js";
import { useSupabase } from "@/app/providers/SupabaseProvider";
import { Bookmark, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/Button";
import Menu from "./Menu";
import ProfileDropdownMenu, { Profile } from "./ProfileDropdownMenu";

interface RightContentProps {
  currentUser?: User | undefined;
  session: Session | null;
  profile: Profile;
}

const RightContent = ({ session, profile }: RightContentProps) => {
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleSignout = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hidden gap-1 lg:flex text-neutral-300 ">
        {!session ? (
          <>
            <div
              onClick={() => {
                router.push("/register");
              }}
              className="transition cursor-pointer hover:underline hover:text-green-700"
            >
              register
            </div>
            <div
              onClick={() => {
                router.push("/login");
              }}
              className="transition cursor-pointer hover:underline hover:text-green-700"
            >
              login
            </div>
          </>
        ) : (
          <>
            <Button className="text-gray-200 transition bg-neutral-800 hover:bg-neutral-800 hover:text-emerald-600">
              <Bookmark size={28} className="pr-1" /> activity
            </Button>
            <Button className="text-gray-200 transition bg-neutral-800 hover:bg-neutral-800 hover:text-emerald-600 focus-visible:ring-0 focus-visible:ring-offset-0">
              <Mail size={28} className="pr-1" /> messages
            </Button>
            <ProfileDropdownMenu
              onClick={handleSignout}
              session={session}
              profile={profile}
            />
          </>
        )}
      </div>
      <Menu session={session} />
    </>
  );
};

export default RightContent;
