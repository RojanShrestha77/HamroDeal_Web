import { getBlogById } from "@/lib/api/blog";
import UserBlogForm from "../../_components/UserBlogForm";
import Link from "next/link";

export default async function EditMyBlogPage({ params }: { params: { id: string } }) {
  let blog = null;
  let error = null;

  try {
    const response = await getBlogById(params.id);
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
        <Link href="/my-blogs" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to my blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Blog not found</p>
        <Link href="/my-blogs" className="text-blue-500 hover:underline mt-4 inline-block">
          ← Back to my blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>
      <UserBlogForm mode="edit" blog={blog} />
    </div>
  );
}
