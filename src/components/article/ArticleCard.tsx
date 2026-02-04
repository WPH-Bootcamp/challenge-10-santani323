"use client";
import Link from "next/link";
import type { Article } from "@/types/blog";
import { formatDate, getInitials } from "@/lib/formater";
import AuthorInfo from "@/components/article/AuthorInfo";
import LikeComentCount from "@/components/article/LikeComentCount";

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
              {article?.author && typeof article.author.id === "number" ? (
                <AuthorInfo
                  {...(article.author as Required<typeof article.author>)}
                />
              ) : null}
              <span className="text-xs text-gray-400">
                {formatDate(article?.createdAt)}
              </span>
            </div>
          </div>

          <LikeComentCount {...article} />
        </div>
      </div>
    </Link>
  );
}
