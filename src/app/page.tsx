"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/article/ArticleCard";
import ArticleCompact from "@/components/article/ArticleCompact";
import { useEffect } from "react";
import { useBlogs } from "@/hooks/useBlogs";

export default function Home() {
  const {
    articles,
    articleMostLiked,
    page,
    limit,
    lastPage,
    currentPage,
    loading,
    fetchArticles,
    fetchMostLikedArticles,
  } = useBlogs();

  useEffect(() => {
    fetchArticles({ page, limit });
    fetchMostLikedArticles({ page: 1, limit: 3 });
  }, [fetchArticles, fetchMostLikedArticles, page, limit]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Recommend For You */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recommend For You</h2>
            <div className="space-y-4">
              {articles.map((item) => (
                <ArticleCard key={item.id} {...item} />
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 items-center">
              <button
                className={`px-3 py-1 rounded flex items-center transition-colors ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:bg-blue-50 hover:text-blue-700"
                }`}
                onClick={() => fetchArticles({ page: currentPage - 1, limit })}
                disabled={currentPage === 1}
              >
                <span className="mr-1">&#60;</span> Previous
              </button>
              {(() => {
                let pages = [];
                if (lastPage <= 3) {
                  for (let i = 1; i <= lastPage; i++) {
                    pages.push(i);
                  }
                } else {
                  if (currentPage === 1) {
                    pages = [1, 2, 3];
                  } else if (currentPage === lastPage) {
                    pages = [lastPage - 2, lastPage - 1, lastPage];
                  } else {
                    pages = [currentPage - 1, currentPage, currentPage + 1];
                  }
                }
                return pages.map((pageNum) => (
                  <button
                    key={pageNum}
                    aria-current={currentPage === pageNum ? "page" : undefined}
                    className={`px-3 py-1 rounded-full mx-1 transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white"
                        : "text-black hover:bg-blue-50 hover:text-blue-700"
                    }`}
                    onClick={() => fetchArticles({ page: pageNum, limit })}
                  >
                    {pageNum}
                  </button>
                ));
              })()}
              {/* Ellipsis if needed */}
              {lastPage > 3 && currentPage < lastPage - 1 && (
                <span className="mx-1">...</span>
              )}
              <button
                className={`px-3 py-1 rounded flex items-center transition-colors ${
                  currentPage === lastPage
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-black hover:bg-blue-50 hover:text-blue-700"
                }`}
                onClick={() => fetchArticles({ page: currentPage + 1, limit })}
                disabled={currentPage === lastPage}
              >
                Next <span className="ml-1">&#62;</span>
              </button>
            </div>
          </div>
          {/* Right: Most Liked */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Most Liked</h2>
            <div className="space-y-4">
              {articleMostLiked.map((item) => (
                <ArticleCompact key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
