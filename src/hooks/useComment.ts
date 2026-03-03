"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as commentService from "@/services/commentService";
import type { ParmComment, CommentResponse } from "@/types/comment";

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
export function useComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<CommentResponse | null>(null);
  const router = useRouter();
  const postComment = useCallback(
    async (payload: ParmComment, articleId: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await commentService.postCommentService(
          payload,
          articleId,
        );
        setComment(response);
        router.refresh();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Failed to post comment");
        } else {
          setError("Failed to post comment");
        }
      } finally {
        setLoading(false);
      }
    },
    [router],
  );
  return {
    loading,
    error,
    comment,
    postComment,
  };
}
