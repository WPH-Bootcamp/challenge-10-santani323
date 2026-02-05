"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import FormCommentArticel from "./FormCommentArticel";
// Dummy data for demonstration, replace with props/comments from parent
const comments = [
  {
    id: 1,
    author: {
      name: "Clarissa",
      avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    createdAt: "27 Maret 2025",
    content: "This is super insightful — thanks for sharing!",
  },
  {
    id: 2,
    author: {
      name: "Marco",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    createdAt: "27 Maret 2025",
    content:
      "Exactly what I needed to read today. Frontend is evolving so fast!",
  },
  {
    id: 3,
    author: {
      name: "Michael Sailor",
      avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    createdAt: "27 Maret 2025",
    content: "Great breakdown! You made complex ideas sound simple.",
  },
  {
    id: 4,
    author: {
      name: "Jessica Jane",
      avatarUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    createdAt: "27 Maret 2025",
    content:
      "As a beginner in frontend, this motivates me a lot. Appreciate it!",
  },
  {
    id: 5,
    author: {
      name: "Alexandra",
      avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    createdAt: "27 Maret 2025",
    content:
      "Well-written and straight to the point. Keep posting content like this!",
  },
];

export default function SeeAllCommentsModal() {
  const [open, setOpen] = useState(false);
  function onClose() {
    setOpen(false);
  }

  return (
    <>
      <Link
        href="#"
        className="text-sky-700 text-sm font-medium hover:underline"
        onClick={() => setOpen(true)}
      >
        See All Comments
      </Link>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-0">
          <DialogPanel className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="font-semibold text-lg">
                Comments({comments.length})
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded hover:bg-gray-100"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            {/* Form */}
            <FormCommentArticel />
            {/* Comments List */}
            <div className="px-6 pb-6 pt-2 max-h-96 overflow-y-auto">
              {comments.map((c, idx) => (
                <div
                  key={c.id}
                  className="flex gap-3 py-4 border-b last:border-b-0"
                >
                  <img
                    src={c.author.avatarUrl}
                    alt={c.author.name}
                    className="w-10 h-10 rounded-full object-cover mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-base">
                      {c.author.name}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">
                      {c.createdAt}
                    </div>
                    <div className="text-sm text-gray-700">{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
