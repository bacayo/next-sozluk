import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    // <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 bg-green-900 ">
    <div className="w-full px-4 mx-auto lg:w-2/3 xl:px-20 md:px-10 sm:px-2">
      {children}
    </div>
  );
};

export default Container;
