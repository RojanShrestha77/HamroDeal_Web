// Empty - waiting for your implementation
import { getAllUsersAction } from "@/lib/actions/(admin)/user-action";
import Link from "next/link";

export default async function Page() {
  return (
    <div>
      <Link
        className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
        href="/seller/products/create"
      >
        Add Product
      </Link>
    </div>
  );
}
