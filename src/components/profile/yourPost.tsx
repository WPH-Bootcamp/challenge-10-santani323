"use client";

import Link from "next/link";
import { useBlogs } from "@/hooks/useBlogs";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/formater";
import { useEffect } from "react";

function stripHtml(value?: string) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function YourPost() {
  const { user } = useUser();
  const { fetchByUserId, articles, loading: postsLoading } = useBlogs();

  useEffect(() => {
    if (user?.id) {
      fetchByUserId({ userId: user.id, page: 1, limit: 5 });
    }
  }, [fetchByUserId, user?.id]);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">
          {articles.length} Post
        </h2>
        <Link
          href="/write"
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 transition-colors"
        >
          Write Post
        </Link>
      </div>

      {postsLoading && (
        <p className="text-sm text-gray-500">Memuat data...</p>
      )}

      {!postsLoading && articles.length === 0 && (
        <p className="text-sm text-gray-500">
          Belum ada postingan. Yuk mulai menulis!
        </p>
      )}

      <div className="space-y-4">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-44 w-full h-36 md:h-auto bg-gray-100">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags.map((tag) => (
                    <span
                      key={`${article.id}-${tag}`}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {stripHtml(article.content)}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  Created at {formatDate(article.createdAt)}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <button
                    type="button"
                    className="text-blue-600 hover:underline transition-colors"
                  >
                    Statistic
                  </button>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-500 hover:underline transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
