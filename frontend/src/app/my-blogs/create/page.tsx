import UserBlogForm from "../_components/UserBlogForm";

export default function CreateMyBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog</h1>
      <UserBlogForm mode="create" />
    </div>
  );
}
