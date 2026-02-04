"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { use, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlogs";
import { formatDate } from "@/lib/formater";
import AuthorInfo from "@/components/article/AuthorInfo";
import ArticleCard from "@/components/article/ArticleCard";

// Hardcoded related article
const relatedArticle = {
  id: 2,
  title: "10 Tips for Writing Clean and Maintainable Code",
  tags: ["Best Practices", "Clean Code", "Software Engineering"],
  author: {
    name: "Sarah Johnson",
    avatarUrl: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  createdAt: "2026-01-20T15:00:00Z",
  imageUrl:
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop",
  content:
    "Writing clean code is an art that every developer should master. In this article, we explore practical tips and techniques to improve your code quality...",
  likes: 189,
  comments: 12,
};

export default function ArticleDetail() {
  const params = useParams();
  const articleId = params?.id?.toString();
  const {
    articleDetail,
    comments,
    articles,
    fetchArticleDetail,
    fetchComments,
    fetchByUserId,
  } = useBlogs();
  console.log("commentscomments", comments);

  useEffect(() => {
    if (articleId) {
      fetchArticleDetail({ id: parseInt(articleId) });
      fetchComments({ id: parseInt(articleId) });
    }
  }, [fetchArticleDetail, fetchComments, articleId]);

  useEffect(() => {
    if (!articleDetail?.author?.id) return;

    console.log("articleDetail", articleDetail);

    fetchByUserId({
      userId: articleDetail.author.id,
      page: 1,
      limit: 5,
    });
  }, [articleDetail?.author?.id]);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-2xl font-bold mb-2">{articleDetail?.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
          {articleDetail?.tags.map((tag: string, index: number) => (
            <span
              key={`${tag}-${index}`}
              className="
                inline-flex
                items-center
                px-4 py-1.5
                rounded-full
                border
                border-gray-300
                text-gray-800
                text-sm
                font-medium
              "
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-6">
          {articleDetail?.author &&
          typeof articleDetail.author.id === "number" ? (
            <AuthorInfo
              {...(articleDetail.author as Required<
                typeof articleDetail.author
              >)}
            />
          ) : null}
          <span className="text-xs text-gray-400">
            {formatDate(articleDetail?.createdAt)}
          </span>
        </div>
        <div className="mb-6">
          <img
            src={articleDetail?.imageUrl}
            width={600}
            height={300}
            alt={articleDetail?.title}
            className="rounded w-full object-cover"
          />
        </div>
        <div className="prose max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{ __html: articleDetail?.content ?? "" }}
          />
        </div>
        <hr className="my-8 bg-gray-300" />
        {/* Comments */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Comments ({comments.length})</h3>
          <form className="mb-4">
            <input
              type="text"
              placeholder="Add your comment..."
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </form>
          <div className="space-y-4">
            {comments?.map((comment) => (
              <div key={comment.id} className="flex gap-2 items-start">
                <img
                  src={comment.author.avatarUrl}
                  width={32}
                  height={32}
                  alt={comment.author.name}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{comment.author.name}</div>
                  <div className="text-sm text-gray-600">{comment.content}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatDate(comment.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Another Post */}
        <div className="mt-10">
          <h3 className="font-semibold mb-3">Another Post</h3>
          <div className="space-y-4">
            {articles?.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} {...relatedArticle} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
