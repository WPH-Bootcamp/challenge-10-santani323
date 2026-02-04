"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { use, useEffect } from "react";
import { useBlogs } from "@/hooks/useBlogs";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Hardcoded article data
const articleDetailTes = {
  id: 1,
  title: "The Ultimate Guide to Modern Web Development in 2026",
  tags: ["Web Development", "JavaScript", "React", "Next.js"],
  author: {
    name: "John Developer",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  createdAt: "2026-01-15T10:30:00Z",
  imageUrl:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
  content: `<p>In the rapidly evolving world of web development, staying up-to-date with the latest technologies and best practices is crucial. This comprehensive guide will walk you through the essential tools, frameworks, and methodologies that define modern web development in 2026.</p>
  
  <h2>Understanding the Modern Stack</h2>
  <p>Today's web development landscape is dominated by component-based frameworks like React, Vue, and Angular. Among these, React with Next.js has emerged as a particularly powerful combination, offering server-side rendering, static site generation, and excellent developer experience.</p>
  
  <h2>Key Technologies to Master</h2>
  <p>To excel in modern web development, you should focus on:</p>
  <ul>
    <li>TypeScript for type-safe JavaScript development</li>
    <li>Next.js for React-based full-stack applications</li>
    <li>Tailwind CSS for utility-first styling</li>
    <li>GraphQL or REST APIs for data fetching</li>
    <li>Vercel or similar platforms for deployment</li>
  </ul>
  
  <h2>Best Practices</h2>
  <p>Always prioritize performance, accessibility, and user experience. Use modern tools like ESLint and Prettier to maintain code quality, and implement proper testing strategies with Jest and React Testing Library.</p>
  
  <p>The journey of becoming a proficient web developer is continuous. Keep learning, experimenting, and building projects to sharpen your skills.</p>`,
  likes: 234,
  comments: 3,
};

// Hardcoded comments data
const commentsData = [
  {
    id: 1,
    userName: "James Anderson",
    userAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
    comment:
      "Great article, thanks for sharing! The section on TypeScript was particularly helpful.",
    createdAt: "2026-01-16T08:20:00Z",
  },
  {
    id: 2,
    userName: "Chitra Patel",
    userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    comment:
      "Very informative, I like the roadmap! Can't wait to try Next.js on my next project.",
    createdAt: "2026-01-17T14:45:00Z",
  },
  {
    id: 3,
    userName: "Michael Chen",
    userAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    comment:
      "Thanks for the insights, looking forward to more posts! The best practices section is gold.",
    createdAt: "2026-01-18T09:15:00Z",
  },
];

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
  const { articleDetail, fetchArticleDetail, fetchComments } = useBlogs();

  useEffect(() => {
    if (articleId) {
      fetchArticleDetail({ id: parseInt(articleId) });
      fetchComments({ id: parseInt(articleId) });
    }
  }, [fetchArticleDetail, fetchComments, articleId]);

  function getInitials(name?: string) {
    if (!name) return "";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-2xl font-bold mb-2">{articleDetail?.title}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-4">
          {articleDetail?.tags.map((tag: string, index: number) => (
            <span
              key={`${tag}-${index}`}
              className="F
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
          {articleDetail?.author?.avatarUrl ? (
            <img
              src={articleDetail?.author?.avatarUrl}
              alt={articleDetail?.author?.name ?? "author"}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 text-xs font-bold flex items-center justify-center">
              {getInitials(articleDetail?.author?.name)}
            </div>
          )}
          <span className="text-sm font-medium">
            {articleDetail?.author?.name}
          </span>
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
          <div dangerouslySetInnerHTML={{ __html: articleDetail?.content }} />
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
          <span>Likes: {articleDetail?.likes}</span>
          <span>Comments: {articleDetail?.comments}</span>
        </div>
        {/* Comments */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">
            Comments ({commentsData.length})
          </h3>
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
            {commentsData.map((comment) => (
              <div key={comment.id} className="flex gap-2 items-start">
                <img
                  src={comment.userAvatar}
                  width={32}
                  height={32}
                  alt={comment.userName}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{comment.userName}</div>
                  <div className="text-sm text-gray-600">{comment.comment}</div>
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
          <Link
            href={`/article/${relatedArticle.id}`}
            className="flex gap-4 bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow"
          >
            <img
              src={relatedArticle.imageUrl}
              width={120}
              height={120}
              alt={relatedArticle.title}
              className="rounded object-cover"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-semibold mb-1">
                  {relatedArticle.title}
                </h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {relatedArticle.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="bg-gray-100 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                  {relatedArticle.content}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                <div className="flex items-center gap-2">
                  <img
                    src={relatedArticle.author.avatarUrl}
                    width={24}
                    height={24}
                    alt={relatedArticle.author.name}
                    className="rounded-full"
                  />
                  <span>{relatedArticle.author.name}</span>
                </div>
                <span>{formatDate(relatedArticle.createdAt)}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
