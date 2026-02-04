"use client";

import { formatDate } from "@/lib/formater";
import React from "react";
import AuthorInfo from "@/components/article/AuthorInfo";
import { AvatarUrl } from "@/types/blog";

export default function CommentEntry({ comment }: { comment: AvatarUrl }) {
  return (
    <div key={comment.id} className="flex gap-2 items-start py-4">
      <AuthorInfo
        id={comment.id}
        name={comment.name}
        email={comment.email ?? ""}
        avatarUrl={comment.avatarUrl}
      />
      <div>
        <div className="text-sm text-gray-600">{comment.content}</div>
        <div className="text-xs text-gray-400 mt-1">
          {formatDate(comment.createdAt)}
        </div>
      </div>
    </div>
  );
}
