import Link from "next/link";
import { getAllBlogs } from "@/lib/api/blog";

export default async function BlogPage({ searchParams }: { searchParams: { page?: string; search?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search || '';

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
        <h1 className="text-3xl font-bold">Blog</h1>
        <Link
          href="/my-blogs"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          My Blogs
        </Link>
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
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          blogs.map((blog: any) => (
            <div key={blog._id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <Link href={`/blog/${blog._id}`}>
                <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">{blog.title}</h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  By {blog.authorId?.firstName} {blog.authorId?.lastName}
                </span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              <Link
                href={`/blog/${blog._id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                Read more →
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/blog?page=${page - 1}${search ? `&search=${search}` : ''}`}
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
              href={`/blog?page=${page + 1}${search ? `&search=${search}` : ''}`}
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
