import Link from "next/link";
import { getAllBlogs } from "@/lib/api/blog";

export default async function MyBlogsPage({ searchParams }: { searchParams: Promise<{ page?: string; search?: string }> }) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
  const search = resolvedParams.search || '';

  let blogs = [];
  let pagination = null;
  let error = null;

  try {
    const response = await getAllBlogs({ page, size: 10, search });
    blogs = response.data || [];
    pagination = response.pagination;
  } catch (err: any) {
    error = err.message;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Link
          href="/my-blogs/create"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create New Blog
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <form method="get" className="flex gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search your blogs..."
            defaultValue={search}
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Search
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Blog List */}
      <div className="grid gap-6">
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">You haven't created any blogs yet.</p>
            <Link
              href="/my-blogs/create"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 inline-block"
            >
              Create Your First Blog
            </Link>
          </div>
        ) : (
          blogs.map((blog: any) => (
            <div key={blog._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <Link href={`/blog/${blog._id}`}>
                  <h2 className="text-2xl font-semibold hover:text-blue-600">{blog.title}</h2>
                </Link>
                <div className="flex gap-2">
                  <Link
                    href={`/my-blogs/edit/${blog._id}`}
                    className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Edit
                  </Link>
                </div>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  By {blog.authorId?.firstName} {blog.authorId?.lastName}
                </span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/my-blogs?page=${page - 1}${search ? `&search=${search}` : ''}`}
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
              href={`/my-blogs?page=${page + 1}${search ? `&search=${search}` : ''}`}
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
