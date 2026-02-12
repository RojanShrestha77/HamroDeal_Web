import Link from "next/link";
import { getBlogById } from "@/lib/api/blog";

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let blog = null;
  let error = null;

  try {
    const response = await getBlogById(id);
    blog = response.data;
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Blog not found</p>
        <Link href="/blog" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/blog" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to blogs
      </Link>

      <article className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center gap-4 text-gray-600 mb-6 pb-6 border-b">
          <span>
            By {blog.authorId?.firstName} {blog.authorId?.lastName}
          </span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-800 whitespace-pre-wrap">{blog.content}</p>
        </div>
      </article>
    </div>
  );
}
