import { fetchAPI } from "@/lib/api";
import type {
  ArticlesResponse,
  PaginationParams,
  UrlParams,
  ArticleDetailResponse,
  ParamArticleDetail,
  ComponentArticleCardProps,
  NewArticleParams,
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
}: ParamArticleDetail): Promise<ArticleDetailResponse> => {
  return fetchAPI<ArticleDetailResponse>(`/posts/${id}`);
};

export const getArticleCommentsService = async ({
  id,
}: ParamArticleDetail): Promise<ComponentArticleCardProps[]> => {
  return fetchAPI<ComponentArticleCardProps[]>(`/posts/${id}/comments`);
};

export const getPostsByUserIdService = async ({
  page = 1,
  limit = 5,
  userId,
}: UrlParams): Promise<ArticlesResponse> => {
  return fetchAPI<ArticlesResponse>(
    `/posts/by-user/${userId}?page=${page}&limit=${limit}`,
  );
};

export const addPostService = async (
  payload: NewArticleParams,
): Promise<ArticleDetailResponse> => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  formData.append("tags", JSON.stringify(payload.tags));
  formData.append("image", payload.image);

  return fetchAPI<ArticleDetailResponse>("/posts", {
    method: "POST",
    body: formData,
  });
};
