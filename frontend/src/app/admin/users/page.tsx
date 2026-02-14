import { getAllUsers } from "@/lib/api/(admin)/user";
import Link from "next/link";
import UsersTable from "./users-table";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? parseInt(resolvedParams.page) : 1;
  const search = resolvedParams.search || "";

  let users = [];
  let pagination = null;
  let error = null;

  try {
    const response = await getAllUsers({ page, size: 10, search });
    users = response.data || [];
    pagination = response.pagination;
  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <div className="p-4">{error}</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <Link
        className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
        href="/admin/users/create"
      >
        Create User
      </Link>

      {/* Search */}
      <form method="get" className="flex gap-2">
        <input
          type="text"
          name="search"
          placeholder="Search users..."
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

      <UsersTable initialUsers={users} />

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {page > 1 && (
            <Link
              href={`/admin/users?page=${page - 1}${search ? `&search=${search}` : ""}`}
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
              href={`/admin/users?page=${page + 1}${search ? `&search=${search}` : ""}`}
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
