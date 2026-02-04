import { fetchAPI } from "@/lib/api";
import type {
  ArticlesResponse,
  PaginationParams,
  ArticleDetailResponse,
  ParamArticleDetail,
} from "@/types/blog";

export const getArticlesService = async ({
  page = 1,
  limit = 5,
}: PaginationParams): Promise<ArticlesResponse> => {
  return fetchAPI<ArticlesResponse>(
    `/posts/recommended?page=${page}&limit=${limit}`,
  );
};

export const getMostLikedService = async ({
  page = 1,
  limit = 5,
}: PaginationParams): Promise<ArticlesResponse> => {
  return fetchAPI<ArticlesResponse>(
    `/posts/most-liked?page=${page}&limit=${limit}`,
  );
};

export const getArticleDetailService = async ({
  id,
}: ParamArticleDetail): Promise<    > => {
  return fetchAPI<ArticleDetailResponse>(`/posts/${id}`);
};

export const getArticleCommentsService = async ({
  id,
}: ParamArticleDetail): Promise<ArticleDetailResponse> => {
  return fetchAPI<ArticleDetailResponse>(`/posts/${id}/comments`);
};
