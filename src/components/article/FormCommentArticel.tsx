"use client";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function FormCommentArticel() {
  const [comment, setComment] = useState("");
  return (
    <>
      {/* Form */}
      <div className="px-6 pt-4 pb-2">
        <label className="block font-medium mb-2 text-sm">
          Give your Comments
        </label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 mb-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
          placeholder="Enter your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
        />
        <div className="flex justify-end">
          <Button type="submit" variant="primary" align="right" onClick={() => {}}>
            Send
          </Button>
        </div>
      </div>
    </>
  );
}
