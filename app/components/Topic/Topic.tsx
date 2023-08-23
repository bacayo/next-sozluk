"use client";

interface TopicProps {
  topic: any;
  onClick?: () => void;
}

const Topic = ({ topic, onClick }: TopicProps) => {
  return (
    <h1
      onClick={onClick}
      className="p-2 text-2xl font-bold text-green-600 cursor-pointer hover:underline"
    >
      {topic}
    </h1>
  );
};

export default Topic;
