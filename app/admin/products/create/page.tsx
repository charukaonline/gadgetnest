import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function CreateProductPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
              <span className="mx-2">/</span>
              <Link href="/admin/products" className="hover:underline">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Create</span>
            </div>

            <h1 className="text-3xl font-bold">Add New Product</h1>
            <p className="text-muted-foreground mt-1">
              Create a new product to add to your inventory
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
