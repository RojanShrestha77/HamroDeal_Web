"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { handleDeleteBlog } from "@/lib/actions/(admin)/blog-actions";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  content: string;
  authorId: {
    firstName: string;
    lastName: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface BlogTableProps {
  blogs: Blog[];
  onDelete?: () => void;
}

export default function BlogTable({ blogs, onDelete }: BlogTableProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setDeleting(id);
    try {
      const response = await handleDeleteBlog(id);
      if (response.success) {
        toast.success(response.message);
        onDelete?.();
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to delete blog");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Created At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {blogs.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No blogs found
              </td>
            </tr>
          ) : (
            blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {blog.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {blog.content.substring(0, 100)}...
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {blog.authorId?.firstName} {blog.authorId?.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium space-x-2">
                  <Link
                    href={`/blog/${blog._id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deleting === blog._id}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                  >
                    {deleting === blog._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
