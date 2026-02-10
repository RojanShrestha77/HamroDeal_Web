"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleCreateBlog, handleUpdateBlog } from "@/lib/actions/blog-actions";

const BlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

type BlogFormData = z.infer<typeof BlogSchema>;

interface UserBlogFormProps {
  blog?: {
    _id: string;
    title: string;
    content: string;
  };
  mode: "create" | "edit";
}

export default function UserBlogForm({ blog, mode }: UserBlogFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>({
    resolver: zodResolver(BlogSchema),
    defaultValues: blog
      ? {
          title: blog.title,
          content: blog.content,
        }
      : undefined,
  });

  const onSubmit = async (data: BlogFormData) => {
    try {
      let response;
      if (mode === "create") {
        response = await handleCreateBlog(data);
      } else {
        response = await handleUpdateBlog(blog!._id, data);
      }

      if (response.success) {
        toast.success(response.message || "Blog saved successfully");
        router.push("/my-blogs");
        router.refresh();
      } else {
        toast.error(response.message || "Failed to save blog");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Enter blog title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <textarea
          id="content"
          {...register("content")}
          rows={15}
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Enter blog content"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Blog"
              : "Update Blog"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
