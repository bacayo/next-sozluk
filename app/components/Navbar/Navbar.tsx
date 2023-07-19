import React from "react";
import Logo from "./Logo";
import Container from "../Container";

import SearchInput from "../Inputs/SearchInput";
import RightContent from "./RightContent";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-neutral-800">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-14 md:justify-items-start ">
            <Logo />
            <SearchInput placeholder="topic, #entry, @author" />
            <RightContent />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
