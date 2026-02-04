// Empty - waiting for your implementation
import { getAllUsersAction } from "@/lib/actions/(admin)/user-action";
import Link from "next/link";
import UsersTable from "./users-table";

export default async function Page() {
  const result = await getAllUsersAction();

  if (!result.success) {
    return <div className="p-4">{result.message}</div>;
  }
  return (
    <div>
      <Link
        className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
        href="/admin/users/create"
      >
        Create User
      </Link>
      <UsersTable initialUsers={result.data || []} />
    </div>
  );
}
