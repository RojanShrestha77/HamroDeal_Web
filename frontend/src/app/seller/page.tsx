import { handleWhoAmI } from "@/lib/actions/auth.action";
import { notFound, redirect } from "next/navigation";

export default async function Page() {
  const result = await handleWhoAmI();

  if (!result.success || !result.data) {
    // Not logged in
    redirect("/login");
  }

  const user = result.data;

  // Block non-sellers
  if (user.role !== "seller") {
    notFound(); // hides route completely
  }

  // Optional: block unapproved sellers
  if (!user.isApproved) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Seller Approval Pending</h1>
        <p className="text-gray-600">
          Your seller account is waiting for admin approval. You’ll be able to
          add products once approved.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Seller Dashboard</h1>
      <p className="text-gray-600 mt-2">
        Welcome back, {user.email}. Manage your products from here.
      </p>
    </div>
  );
}
