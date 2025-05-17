import { fetchProducts } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tech Gadgets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <Card key={product.id}>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="rounded-t-md object-cover h-48 w-full"
            />
            <CardContent className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-muted-foreground text-sm">
                {product.category}
              </p>
              <p className="text-primary font-medium">${product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
