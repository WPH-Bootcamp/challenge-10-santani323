"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as blogService from "@/services/blogService";
import type {
  PaginationParams,
  ParamArticleDetail,
  ComponentArticleCardProps,
  ArticleDetailResponse,
  ArticlesResponse,
  UrlParams,
  Article,
  NewArticleParams,
  AvatarUrl,
  ParamSearchArticles,
} from "@/types/blog";

type ApiErrorResponse = {
  statusCode?: number;
  message?: string;
  error?: string;
};

const isApiError = (value: unknown): value is ApiErrorResponse => {
  return (
    typeof value === "object" &&
    value !== null &&
    ("statusCode" in value || "error" in value)
  );
};

export function useBlogs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleMostLiked, setArticleMostLiked] = useState<Article[]>([]);
  const [articleDetail, setArticleDetail] =
    useState<ArticleDetailResponse | null>(null);
  const [comments, setComments] = useState<ComponentArticleCardProps[]>([]);
  const [likes, setLikes] = useState<AvatarUrl[]>([]);
  const [totalArticles, setTotalArticles] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);

  const fetchArticles = useCallback(async (params: PaginationParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.getArticlesService(params);
      setArticles(response.data);
      setTotalArticles(response.total);
      setCurrentPage(response.page);
      setLastPage(response.lastPage);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch articles");
      } else {
        setError("Failed to fetch articles");
      }
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
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch articles");
        } else {
          setError("Failed to fetch articles");
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchArticleDetail = useCallback(async (params: ParamArticleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.getArticleDetailService(params);
      setArticleDetail(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch article detail");
      } else {
        setError("Failed to fetch article detail");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchComments = useCallback(async (params: ParamArticleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.getArticleCommentsService(params);
      setComments(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch article detail");
      } else {
        setError("Failed to fetch article detail");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLikes = useCallback(async (params: ParamArticleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.getArticleLikesService(params);
      setLikes(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch article detail");
      } else {
        setError("Failed to fetch article detail");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const postLikes = useCallback(async (params: ParamArticleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.postArticleLikesService(params);
      setLikes(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to post article likes");
      } else {
        setError("Failed to post article likes");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteArticle = useCallback(async (params: ParamArticleDetail) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.deleteArticleService(params);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch article detail");
      } else {
        setError("Failed to fetch article detail");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByUserId = useCallback(async (params: UrlParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.getPostsByUserIdService(params);
      setArticles(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to fetch article detail");
      } else {
        setError("Failed to fetch article detail");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const addPost = useCallback(async (payload: NewArticleParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await blogService.addPostService(payload);
      if (isApiError(response)) {
        throw new Error(response.message || "Failed to create post");
      }
      return response;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Failed to create post");
      } else {
        setError("Failed to create post");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const putPost = useCallback(
    async (payload: NewArticleParams & { id: number }) => {
      setLoading(true);
      setError(null);
      try {
        const response = await blogService.putPostService(payload);
        if (isApiError(response)) {
          throw new Error(response.message || "Failed to update post");
        }
        return response;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to update post");
        } else {
          setError("Failed to update post");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchSearchArticles = useCallback(
    async (params: ParamSearchArticles) => {
      setLoading(true);
      setError(null);
      try {
        const response = await blogService.getSearchArticlesService(params);
        setArticles(response.data);
        setTotalArticles(response.total);
        setCurrentPage(response.page);
        setLastPage(response.lastPage);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch articles");
        } else {
          setError("Failed to fetch articles");
        }
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    fetchArticles,
    fetchMostLikedArticles,
    fetchArticleDetail,
    fetchComments,
    fetchByUserId,
    addPost,
    putPost,
    fetchLikes,
    deleteArticle,
    fetchSearchArticles,
    postLikes,
    articles,
    articleMostLiked,
    totalArticles,
    currentPage,
    lastPage,
    limit,
    page,
    loading,
    error,
    articleDetail,
    comments,
    likes,
  };
}
