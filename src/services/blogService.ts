import { fetchAPI } from "@/lib/api";
import type { ArticlesResponse, PaginationParams } from "@/types/blog";

export const getArticlesService = async ({
  page = 1,
  limit = 5,
}: PaginationParams): Promise<ArticlesResponse> => {
  return fetchAPI<ArticlesResponse>(
    `/posts/recommended?page=${page}&limit=${limit}`,
  );
};
