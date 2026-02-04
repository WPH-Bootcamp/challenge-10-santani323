"use client";

import { Article } from "@/types/blog";

function stripHtml(value?: string) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function ArticleCompact(article: Article) {
  const excerpt = stripHtml(article.content);
  return (
    <div
      key={article.id}
      className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
    >
      <h3 className="text-sm font-semibold mb-1 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-xs text-gray-600 line-clamp-2">{excerpt}</p>
      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {article.likes}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
          {article.comments}
        </span>
      </div>
    </div>
  );
}
