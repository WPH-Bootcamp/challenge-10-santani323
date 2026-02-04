"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Article } from "@/types/blog";

export default function ActionButtons(item: Article) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <button
        type="button"
        className="text-blue-600 hover:underline transition-colors"
      >
        Statistic
      </button>
      <button
        type="button"
        className="text-blue-600 hover:underline transition-colors"
      >
        Edit
      </button>
      <button
        type="button"
        className="text-red-500 hover:underline transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
