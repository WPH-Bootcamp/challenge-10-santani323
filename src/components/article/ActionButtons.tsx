"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Article } from "@/types/blog";
import DeleteButtons from "./DeleteButtons";
import StatisticButtons from "./StatisticButtons";

export default function ActionButtons(item: Article) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <StatisticButtons {...item} />
      <Link href={`/article/${item?.id}/edit`} passHref>
        <span className="text-blue-600 hover:underline transition-colors">
          Edit
        </span>
      </Link>

      <DeleteButtons {...item} />
    </div>
  );
}
