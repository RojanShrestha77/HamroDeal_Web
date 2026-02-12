import { notFound } from "next/navigation";
import UpdateForm from "./_components/updateForm";
import { handleWhoAmI } from "@/lib/actions/auth.action";

export default async function Page() {
  const result = await handleWhoAmI();

  // 🔍 DEBUG: See what we actually got
  console.log("=== WHOAMI RESULT ===");
  console.log("Success:", result.success);
  console.log("Data:", result.data);
  console.log("Message:", result.message);
  console.log("Full result:", JSON.stringify(result, null, 2));
  console.log("====================");

  if (!result.success) {
    throw new Error("Error fetching user data");
  }

  if (!result.data) {
    notFound();
  }

  return (
    <div>
      <UpdateForm user={result.data} />
    </div>
  );
}
