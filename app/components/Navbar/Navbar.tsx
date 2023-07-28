"use client";

import React from "react";
import Logo from "./Logo";
import Container from "../Container";

import SearchInput from "../Inputs/SearchInput";
import RightContent from "./RightContent";
import Categories from "./Categories";
import { Session, User } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface NavbarProps {
  session: Session | null;
}

const Navbar = ({ session }: NavbarProps) => {
  return (
    <div className="fixed top-0 z-20 w-full bg-neutral-800">
      <div className="py-2">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-14 md:justify-items-start ">
            <Logo />
            <SearchInput placeholder="topic, #entry, @author" />
            <RightContent session={session} />
          </div>
          <Categories />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
