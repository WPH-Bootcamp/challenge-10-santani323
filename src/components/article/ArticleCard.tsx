"use client";
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
    <div
      key={article.id}
      className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4"
    >
      <img
        src={article.imageUrl}
        alt="cover"
        className="w-full md:w-32 h-32 object-cover rounded"
      />
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-semibold mb-1">{article.title}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-xs px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
          <p
            className="text-gray-600 text-sm mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <div className="flex items-center gap-2">
            {article.author?.avatarUrl ? (
              <img
                src={article.author?.avatarUrl}
                alt={article.author?.name ?? "author"}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-[10px] font-semibold flex items-center justify-center">
                {getInitials(article.author?.name)}
              </div>
            )}
            <span>{article?.author?.name}</span>
          </div>
          <span>{formatDate(article?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
