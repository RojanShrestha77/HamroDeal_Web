import Link from "next/link";
import { getAllAdminBlogs } from "@/lib/api/(admin)/blog";
import BlogTable from "./_components/BlogTable";

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
  const search = resolvedParams.search || "";

  let blogs = [];
  let pagination = null;
  let error = null;

  try {
    const response = await getAllAdminBlogs({ page, size: 10, search });
    blogs = response.data || [];
    pagination = response.pagination;
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage All Blogs</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form method="get" className="flex gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search blogs..."
            defaultValue={search}
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Blog Table */}
      <BlogTable blogs={blogs} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/admin/blogs?page=${page - 1}${search ? `&search=${search}` : ""}`}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Previous
            </Link>
          )}
          <span className="px-4 py-2">
            Page {page} of {pagination.totalPages}
          </span>
          {page < pagination.totalPages && (
            <Link
              href={`/admin/blogs?page=${page + 1}${search ? `&search=${search}` : ""}`}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
