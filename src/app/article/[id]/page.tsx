"use client";

import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useBlogs } from "@/hooks/useBlogs";
import { formatDate } from "@/lib/formater";
import { useComment } from "@/hooks/useComment";
import AuthorInfo from "@/components/article/AuthorInfo";
import ArticleCard from "@/components/article/ArticleCard";
import Button from "@/components/ui/Button";
import SeeAllCommentsModal from "@/components/article/SeeAllComments";
import { updateArticle } from "@/store/slices/articelSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import FormCommentArticel from "@/components/article/FormCommentArticel";

export default function ArticleDetail() {
  const dispatch = useAppDispatch();
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

  const { loading: loadingComment, postComment } = useComment();

  const [comment, setComment] = useState("");
  

  // ===== FETCH ARTICLE & COMMENTS =====
  useEffect(() => {
    if (!articleId) return;

    const id = parseInt(articleId);
    fetchArticleDetail({ id });
    fetchComments({ id });
  }, [articleId, fetchArticleDetail, fetchComments, loadingComment]);

  // ===== FETCH OTHER ARTICLES BY AUTHOR =====
  useEffect(() => {
    if (!articleDetail?.author?.id) return;

    fetchByUserId({
      userId: articleDetail.author.id,
      page: 1,
      limit: 5,
    });
    dispatch(updateArticle({ id: articleDetail?.id }));
  }, [articleDetail?.author?.id, fetchByUserId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    postComment(
      {
        content: comment,
      },
      articleDetail?.id || 0,
    );
    setComment("");
  }

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-2xl font-bold mb-2">{articleDetail?.title}</h1>

        <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
          {articleDetail?.tags.map((tag: string, index: number) => (
            <span
              key={`${tag}-${index}`}
              className="px-4 py-1.5 rounded-full border text-gray-800 text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-6">
          {articleDetail?.author?.id && (
            <AuthorInfo {...articleDetail.author} />
          )}
          <span className="text-xs text-gray-400">
            {formatDate(articleDetail?.createdAt)}
          </span>
        </div>

        <img
          src={articleDetail?.imageUrl}
          alt={articleDetail?.title}
          className="rounded w-full object-cover mb-6"
        />

        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{
            __html: articleDetail?.content ?? "",
          }}
        />

        <hr className="my-8" />

        {/* COMMENTS */}
        <div className="mb-8">
          <h3 className="font-semibold mb-2">Comments ({comments.length})</h3>

          
                      <FormCommentArticel />

          <div>
            {comments?.slice(0, 5).map((comment, idx, arr) => (
              <div key={comment.id}>
                <div className="flex items-start gap-3 py-4">
                  <img
                    src={comment.author.avatarUrl}
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full object-cover mt-1"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-base">
                      {comment.author.name}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">
                      {formatDate(comment.createdAt)}
                    </div>
                    <div className="text-sm text-gray-700">
                      {comment.content}
                    </div>
                  </div>
                </div>

                {idx !== arr.length - 1 && <hr className="my-2" />}
              </div>
            ))}

            <div className="mt-2">
              <SeeAllCommentsModal />
            </div>
          </div>
        </div>

        {/* ANOTHER POST */}
        <div className="mt-10">
          <h3 className="font-semibold mb-3">Another Post</h3>
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
