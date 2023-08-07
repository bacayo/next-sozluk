import React from "react";

const TopicBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-grow text-gray-200">{children}</div>;
};

export default TopicBox;
