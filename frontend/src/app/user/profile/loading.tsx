import { exampleAction } from "@/lib/actions/example-action";

export default async function ExamplePage() {
  const result = await exampleAction();
  return <div>load page</div>;
}
