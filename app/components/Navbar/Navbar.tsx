"use client";

import Container from "../Container";
import Logo from "./Logo";

import { Session } from "@supabase/supabase-js";
import SearchInput from "../Inputs/SearchInput";
import Categories from "./Categories";
import RightContent from "./RightContent";
import { Profile } from "./ProfileDropdownMenu";

interface NavbarProps {
  session: Session | null;
  profile: Profile;
}

const Navbar = ({ session, profile }: NavbarProps) => {
  return (
    <div className="fixed z-20 w-[100vw] text-gray-200 bg-neutral-800">
      <div className="py-2">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-14 md:justify-items-start ">
            <Logo />
            <SearchInput placeholder="topic, #entry, @author" />
            <RightContent session={session} profile={profile} />
          </div>
          <Categories />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
