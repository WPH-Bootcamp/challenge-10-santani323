"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Article } from "@/types/blog";
import DeleteButtons from "./DeleteButtons";
import StatisticButtons from "./StatisticButtons";

export default function ActionButtons(item: Article) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <StatisticButtons {...item} />
      <button
        type="button"
        className="text-blue-600 hover:underline transition-colors"
      >
        Edit
      </button>

      <DeleteButtons {...item} />
    </div>
  );
}
