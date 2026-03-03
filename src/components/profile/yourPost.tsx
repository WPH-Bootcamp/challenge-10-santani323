"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useBlogs } from "@/hooks/useBlogs";
import { useUser } from "@/hooks/useUser";
import { formatDate } from "@/lib/formater";
import { useEffect } from "react";
import ArticleCard from "@/components/article/ArticleCard";
import type { ProfileState } from "@/types/users";

function stripHtml(value?: string) {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, "").trim();
}

export default function YourPost() {
  const { user } = useUser();
  const { username, id } = useSelector(
    (state: { profile: ProfileState }) => state.profile,
  );
  const { fetchByUserId, articles, loading: postsLoading } = useBlogs();

  useEffect(() => {
    if (id) {
      fetchByUserId({ userId: id, page: 1, limit: 5 });
    }
  }, [fetchByUserId, id]);

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

      {postsLoading && <p className="text-sm text-gray-500">Memuat data...</p>}

      {!postsLoading && articles.length === 0 && (
        <p className="text-sm text-gray-500">
          Belum ada postingan. Yuk mulai menulis!
        </p>
      )}

      <div className="space-y-4">
        {articles?.map((relatedArticle) => (
          <ArticleCard key={relatedArticle.id} {...relatedArticle} />
        ))} 
      </div>
    </>
  );
}
