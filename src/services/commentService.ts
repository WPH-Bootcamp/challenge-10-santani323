import { fetchAPI } from "@/lib/api";
import type { ParmComment, CommentResponse } from "@/types/comment";

/**
 *  Create Comment Service
 */
export const postCommentService = async (
  payload: ParmComment,
  articleId: number,
): Promise<CommentResponse> => {
  return fetchAPI<CommentResponse, ParmComment>(
    `/posts/${articleId}/comments`,
    {
      method: "POST",
      body: payload,
    },
  );
};
