"use client";

import Link from "next/link";
import { Article } from "@/types/blog";
import LikeComentCount from "@/components/article/LikeComentCount"

function stripHtml(value?: string) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function ArticleCompact(article: Article) {
  const excerpt = stripHtml(article.content);
  return (
    <Link
      key={article.id}
      href={`/article/${article.id}`}
      className="block bg-white rounded-lg shadow p-4 flex flex-col gap-2 hover:shadow-md transition-shadow"
      aria-label={`Buka artikel ${article.title}`}
    >
      <h3 className="text-sm font-semibold mb-1 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-xs text-gray-600 line-clamp-2">{excerpt}</p>
      <LikeComentCount {...article} />
    </Link>
  );
}
