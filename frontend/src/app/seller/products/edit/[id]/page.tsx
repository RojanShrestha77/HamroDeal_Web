import { notFound } from "next/navigation";
import EditProductForm from "./_components/EditProductForm";

async function getProduct(id: string) {
  try {
    const response = await fetch(`http://localhost:5050/api/products/${id}`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getProduct(id);

  if (!result?.success || !result.data) {
    notFound();
  }

  return (
    <div>
      <div>
        <EditProductForm product={result.data} />
      </div>
    </div>
  );
}
