"use client";
import Link from "next/link";
import { Article } from "@/types/blog";
import { useBlogs } from "@/hooks/useBlogs";
import { useState } from "react";
import { useEffect } from "react";

export default function LikeComentCount(item: Article) {
  const { postLikes } = useBlogs();
  const [addLike, setAddLike] = useState(false);

  return (
    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
      <span
        className="flex items-center gap-1"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {item.likes}
      </span>
      <span className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        </svg>
        {item.comments}
      </span>
    </div>
  );
}
