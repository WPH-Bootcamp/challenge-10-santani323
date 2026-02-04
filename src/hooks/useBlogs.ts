"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as blogService from "@/services/blogService";
import type { PaginationParams } from "@/types/blog";

export function useBlogs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [articleMostLiked, setArticleMostLiked] = useState<any[]>([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const fetchArticles = useCallback(async (params: PaginationParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.getArticlesService(params);
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

  const fetchMostLikedArticles = useCallback(
    async (params: PaginationParams) => {
      setLoading(true);
      setError(null);
      try {
        const response = await blogService.getMostLikedService(params);
        setArticleMostLiked(response.data);
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
    fetchMostLikedArticles,
    articles,
    articleMostLiked,
    totalArticles,
    currentPage,
    lastPage,
    limit,
    page,
    loading,
    error,
  };
}
