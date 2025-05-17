import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
