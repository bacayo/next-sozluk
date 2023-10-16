import Link from "next/link";
import React from "react";

const EntryNotFound = ({ slug }: { slug: string[] }) => {
  return (
    <main className="lg:ml-64 pt-28">
      <h3 className="text-lg font-bold text-gray-200">entry not found</h3>
      <p>
        entry with identity <span className="font-bold">(#{slug})</span> was not
        found. it might have been deleted and could be lurking in the limbo now,
        who knows? you may return to{" "}
        <span className="text-emerald-500 hover:underline">
          <Link href="/">home page</Link>{" "}
        </span>
        or keep looking using{" "}
        <span className="text-emerald-500 hover:underline">
          <Link href="/"> advanced search. </Link>{" "}
        </span>
      </p>
    </main>
  );
};

export default EntryNotFound;
