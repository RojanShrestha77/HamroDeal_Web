"use client";

import {
  approveSellerAction,
  deleteUserAction,
} from "@/lib/actions/(admin)/user-action";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  role: "user" | "admin" | "seller";
  isApproved?: boolean;
};

export default function UsersTable({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const pendingSellers = useMemo(
    () => users.filter((u) => u.role === "seller" && !u.isApproved),
    [users],
  );

  const handleApprove = (id: string) => {
    startTransition(async () => {
      const res = await approveSellerAction(id);
      setMessage(res.message);

      if (res.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, isApproved: true } : u)),
        );
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await deleteUserAction(id);
      setMessage(res.message);

      if (res.success) {
        setUsers((prev) => prev.filter((u) => u._id !== id));
      }
    });
  };

  return (
    <div className="space-y-6">
      {message && <div className="border p-2 rounded">{message}</div>}

      <h2 className="text-lg font-semibold">Pending Sellers</h2>
      {pendingSellers.length === 0 ? (
        <p>No pending sellers 🎉</p>
      ) : (
        <ul className="space-y-2">
          {pendingSellers.map((u) => (
            <li key={u._id} className="flex justify-between border p-2 rounded">
              <span>{u.email}</span>
              <button
                onClick={() => handleApprove(u._id)}
                disabled={isPending}
                className="text-green-600 border border-green-600 px-2 py-1 rounded"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-lg font-semibold">All Users</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li key={u._id} className="flex justify-between border p-2 rounded">
            <span>
              {u.email} — {u.role}
            </span>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/users/${u._id}/edit`}
                className="text-blue-600 hover:text-blue-900"
              >
                Edit
              </Link>

              <button
                onClick={() => handleDelete(u._id)}
                disabled={isPending || u.role === "admin"}
                className="text-red-600 border border-red-600 px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
