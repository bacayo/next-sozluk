import React from "react";

const Topic = ({ topic }: { topic: any }) => {
  return (
    <h1 className="p-2 text-2xl font-bold text-green-600 cursor-pointer hover:underline">
      {topic}
    </h1>
  );
};

export default Topic;
