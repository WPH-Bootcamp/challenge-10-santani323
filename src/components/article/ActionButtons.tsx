"use client";
import Link from "next/link";
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
