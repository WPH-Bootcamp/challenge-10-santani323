"use client";
import { Author } from "@/types/blog";
import { getInitials } from "@/lib/formater";

export default function AuthorInfo(Item: Author) {
  return (
    <>
      {Item?.avatarUrl ? (
        <img
          src={Item?.avatarUrl}
          alt={Item?.name ?? "author"}
          className="w-8 h-8 rounded-full object-cover"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center">
          {getInitials(Item?.name)}
        </div>
      )}
      <span className="text-sm font-medium">{Item?.name}</span>
    </>
  );
}
