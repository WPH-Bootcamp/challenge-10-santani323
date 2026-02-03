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
    page,
    limit,
    lastPage,
    currentPage,
    loading,
    fetchArticles,
  } = useBlogs();

  useEffect(() => {
    fetchArticles({ page, limit });
  }, [fetchArticles, page, limit]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-16">
        <div className="w-full max-w-5xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Recommend For You */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Recommend For You</h2>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 animate-pulse"
                  >
                    <div className="w-full md:w-32 h-32 bg-gray-200 rounded" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                      <div className="flex gap-2">
                        <div className="h-5 w-16 bg-gray-200 rounded" />
                        <div className="h-5 w-16 bg-gray-200 rounded" />
                        <div className="h-5 w-16 bg-gray-200 rounded" />
                      </div>
                      <div className="h-3 bg-gray-200 rounded w-full" />
                      <div className="h-3 bg-gray-200 rounded w-5/6" />
                      <div className="flex items-center justify-between">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                articles.map((item) => <ArticleCard key={item.id} {...item} />)
              )}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2 items-center">
              <button
                className="px-3 py-1 rounded  text-black hover:bg-gray-100 flex items-center"
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
                    className={`px-3 py-1 rounded-full mx-1 ${currentPage === pageNum ? "bg-blue-600 text-white" : "text-black hover:bg-gray-100"}`}
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
                className="px-3 py-1 rounded text-black hover:bg-gray-100 flex items-center"
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
              {(articles.length ? articles.slice(0, 3) : [1, 2, 3]).map(
                (item) => (
                  <ArticleCompact
                    key={typeof item === "number" ? item : item.id}
                    item={
                      typeof item === "number"
                        ? item.toString()
                        : item.id.toString()
                    }
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
