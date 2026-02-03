import { handleWhoAmI } from "@/lib/actions/auth.action";
import { notFound } from "next/navigation";

export default async function Page() {
  const result = await handleWhoAmI();
  console.log("=== WHOAMI RESULT ===");
  console.log("Success:", result.success);
  console.log("Data:", result.data);
  console.log("Message:", result.message);
  console.log("Full result:", JSON.stringify(result, null, 2));
  console.log("====================");
  if (!result.success) {
    throw new Error("Error fetching data");
  }
  if (!result.data) {
    notFound();
  }
  return <div>this is dashbaord</div>;
}
