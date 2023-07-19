import React from "react";
import Logo from "./Logo";
import Container from "../Container";

import SearchInput from "../Inputs/SearchInput";
import RightContent from "./RightContent";
import Categories from "./Categories";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-20 w-full bg-neutral-800">
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-2 md:gap-14 md:justify-items-start ">
            <Logo />
            <SearchInput placeholder="topic, #entry, @author" />
            <RightContent />
          </div>
          <Categories />
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
