"use client";

interface TopicProps {
  topic: any;
  onClick?: () => void;
  params: {
    slug: string;
  };
}

const Topic = ({ topic, onClick, params }: TopicProps) => {
  return (
    <>
      <h1
        onClick={onClick}
        className="p-2 text-2xl font-bold cursor-pointer text-emerald-600 hover:underline"
      >
        {topic ? topic : params.slug}
      </h1>
    </>
  );
};

export default Topic;
