"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getArticlesService } from "@/services/blogService";
import type { PaginationParams } from "@/types/blog";

export function useBlogs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchArticles = useCallback(async (params: PaginationParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getArticlesService(params);
      setArticles(response.data);
      setTotalArticles(response.total);
      setCurrentPage(response.page);
      setLastPage(response.lastPage);
    } catch (err: any) {
      setError(err.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }, []);

  const paginationParams = useCallback(async (params: PaginationParams) => {
    try {
      setPage(params.page || 1);
      setLimit(params.limit || 5);
    } catch (err: any) {
      setError(err.message || "Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fetchArticles,
    paginationParams,
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
