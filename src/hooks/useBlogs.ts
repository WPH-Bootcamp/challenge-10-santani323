"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getArticlesService } from "@/services/blogService";

export function useBlogs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchArticles = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLoading(true);
      setError(null);
      try {
        const response = await getArticlesService({ page, limit });
        setArticles(response.data);
        setTotalArticles(response.total);
        setCurrentPage(response.page);
        setLastPage(response.lastPage);
      } catch (err: any) {
        setError(err.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    fetchArticles,
    articles,
    totalArticles,
    currentPage,
    lastPage,
    limit,
    page,
    loading,
    error,
  };
}
