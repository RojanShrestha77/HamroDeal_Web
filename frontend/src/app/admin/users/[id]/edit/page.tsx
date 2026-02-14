import { getOneUser } from "@/lib/api/(admin)/user";
import EditUserForm from "./_components/EditUserForm";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let user = null;
  let error = null;

  try {
    const response = await getOneUser(id);
    console.log("Full response:", response); // Add this
    console.log("User data:", response.data); // Add this
    user = response.data;
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="p-4">User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit User</h1>
      <EditUserForm user={user} />
    </div>
  );
}
