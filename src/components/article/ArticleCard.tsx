"use client";
import Link from "next/link";
import type { Article } from "@/types/blog";

function formatDate(dateValue?: string) {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getInitials(name?: string) {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export default function ArticleCard(article: Article) {
  return (
    <Link
      href={`/article/${article.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      aria-label={`Buka artikel ${article.title}`}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Container */}
        <div className="w-full md:w-2/5 h-48 md:h-auto md:min-h-64 flex-shrink-0">
          <img
            src={article.imageUrl}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Container */}
        <div className="p-5 md:p-6 flex flex-col justify-between flex-1">
          <div>
            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold mb-3 line-clamp-2 text-gray-900">
              {article.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content Excerpt */}
            <p
              className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Author & Date Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {article.author?.avatarUrl ? (
                <img
                  src={article.author?.avatarUrl}
                  alt={article.author?.name ?? "author"}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center">
                  {getInitials(article.author?.name)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {article?.author?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(article?.createdAt)}
                </p>
              </div>
            </div>
          </div>
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
      </div>
    </Link>
  );
}
