"use client";

import { Edit2, Star, Trash2 } from "lucide-react";
import { Review } from "../schema/review.schema";

interface ReviewCardProps {
  review: Review;
  isOwner?: boolean;
  onEdit?: (reviewId: string) => void;
  onDelete?: (reviewId: string) => void;
}

export default function ReviewCard({
  review,
  isOwner,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const initials =
    `${review.userId.firstName[0]}${review.userId.lastName[0]}`.toUpperCase();

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        {/* Left: avatar + name + stars + date */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
            {initials}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {review.userId.firstName} {review.userId.lastName}
              </span>
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < review.rating
                        ? "fill-gray-800 text-gray-800"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
            </div>
            <p className="mt-0.5 text-xs text-gray-400">
              {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        {/* Owner actions */}
        {isOwner && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit?.(review._id)}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              title="Edit review"
            >
              <Edit2 size={15} />
            </button>
            <button
              onClick={() => onDelete?.(review._id)}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              title="Delete review"
            >
              <Trash2 size={15} />
            </button>
          </div>
        )}
      </div>

      {/* Comment */}
      <p className="mt-3 pl-12 text-sm leading-relaxed text-gray-600">
        {review.comment}
      </p>
    </div>
  );
}
