"use client";

import React from "react";

type ArticleCompactProps = {
  item: string;
};
export default function ArticleCompact({ item }: ArticleCompactProps) {
  return (
    <div
      key={item}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
    >
      <h3 className="text-sm font-semibold mb-1">
        5 Reasons to Learn Frontend Development in 2025
      </h3>
      <p className="text-xs text-gray-500 mb-1 line-clamp-1">
        Frontend development is crucial for building beautiful and interactive
        user experiences...
      </p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>John Doe</span>
        <span>2 May 2025</span>
      </div>
    </div>
  );
}
