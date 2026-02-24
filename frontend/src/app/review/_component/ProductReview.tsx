"use client";

import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "./ReviewCard";
import AddReviewForm from "./AddReviewForm";
import {
  getProductReviewsAction,
  deleteReviewAction,
} from "@/lib/actions/review.action";
import { Review } from "../schema/review.schema";

interface ProductReviewsProps {
  productId: string;
  currentUserId?: string;
}

export default function ProductReviews({
  productId,
  currentUserId,
}: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const loadReviews = async () => {
    setLoading(true);
    const result = await getProductReviewsAction(productId, page, 10);
    setLoading(false);

    if (result.success) {
      setReviews(result.data);
      setAvgRating(result.avgRating);
      setTotalPages(result.pagination.totalPages);
      setTotal(result.pagination.total);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [productId, page]);

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const result = await deleteReviewAction(reviewId);
    if (result.success) {
      loadReviews();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="mt-10">
      {/* Section header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-bold text-gray-800">Customer Reviews</h2>

        {avgRating > 0 && (
          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-2.5 shadow-sm">
            {/* Stars */}
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(avgRating)
                      ? "fill-gray-800 text-gray-800"
                      : "text-gray-200"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-800">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400">
              {total} {total === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
      </div>

      {/* Add review form */}
      {currentUserId && (
        <AddReviewForm productId={productId} onSuccess={loadReviews} />
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800" />
          <p className="text-xs text-gray-400">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-16">
          <div className="mb-3 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={22} className="text-gray-200" />
            ))}
          </div>
          <p className="text-sm font-medium text-gray-500">No reviews yet</p>
          <p className="mt-1 text-xs text-gray-400">
            Be the first to share your experience
          </p>
        </div>
      ) : (
        <>
          {/* Reviews list */}
          <div className="space-y-3">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                isOwner={review.userId._id === currentUserId}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl border text-sm font-medium shadow-sm transition-colors ${
                    p === page
                      ? "border-gray-800 bg-gray-900 text-white"
                      : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
