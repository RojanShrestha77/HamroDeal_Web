"use client";

import { useState } from "react";
import { CreateReviewSchema } from "../schema/review.schema";
import { createReviewAction } from "@/lib/actions/review.action";
import { Star, CheckCircle2 } from "lucide-react";

interface AddReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

export default function AddReviewForm({
  productId,
  onSuccess,
}: AddReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoveredRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {},
  );
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const validation = CreateReviewSchema.safeParse({ rating, comment });

    if (!validation.success) {
      const fieldErrors: { rating?: string; comment?: string } = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0] === "rating") fieldErrors.rating = issue.message;
        else if (issue.path[0] === "comment")
          fieldErrors.comment = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const result = await createReviewAction(productId, validation.data);
    setLoading(false);

    if (result.success) {
      setRating(0);
      setComment("");
      setSuccess("Review submitted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      onSuccess?.();
    } else {
      setErrors({ comment: result.message });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-gray-500">
        Write a Review
      </h3>

      {/* Success message */}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <CheckCircle2 size={16} className="text-gray-600" />
          <p className="text-sm font-medium text-gray-700">{success}</p>
        </div>
      )}

      {/* Rating */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Rating <span className="text-gray-800">*</span>
        </label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform focus:outline-none hover:scale-110"
            >
              <Star
                size={28}
                className={
                  star <= (hoverRating || rating)
                    ? "fill-black text-black"
                    : "fill-gray-200 text-gray-200"
                }
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-xs font-medium text-gray-400">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </span>
          )}
        </div>
        {errors.rating && (
          <p className="mt-1.5 text-xs text-gray-500">{errors.rating}</p>
        )}
      </div>

      {/* Comment */}
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={`w-full resize-none rounded-xl border bg-gray-50 p-3.5 text-sm text-gray-700 placeholder-gray-300 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 ${
            errors.comment ? "border-gray-400" : "border-gray-200"
          } min-h-[110px]`}
          placeholder="Share your experience with this product..."
          maxLength={500}
        />
        <div className="mt-1.5 flex items-center justify-between">
          {errors.comment ? (
            <p className="text-xs text-gray-500">{errors.comment}</p>
          ) : (
            <span />
          )}
          <p className="text-xs text-gray-300">{comment.length}/500</p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Submitting...
          </span>
        ) : (
          "Submit Review"
        )}
      </button>
    </form>
  );
}
