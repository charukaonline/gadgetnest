import ProductForm from "@/components/admin/ProductForm";

export default function CreateProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
