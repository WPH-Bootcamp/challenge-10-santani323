"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Article } from "@/types/blog";
import Button from "../ui/Button";
import { useBlogs } from "@/hooks/useBlogs";

export default function DeleteButtons(item: Article) {
  const { deleteArticle } = useBlogs();
  const [open, setOpen] = useState(false);

  const handelDelete = () => {
    deleteArticle({ id: item.id });
    setOpen(false);
  };
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="text-red-500 hover:underline transition-colors"
      >
        Delete
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 z-10 w-screen flex items-center justify-center">
          <DialogPanel className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            {/* Title */}
            <DialogTitle
              as="h3"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              Delete
            </DialogTitle>
            {/* Message */}
            <p className="text-gray-600 mb-8">Are you sure to delete?</p>
            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" variant="danger" onClick={handelDelete}>
                Delete
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
