import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Manage your product inventory
            </p>
            <div className="flex gap-2">
              <Link href="/admin/products/create">
                <Button>Add Product</Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              View and manage customer orders
            </p>
            <Link href="/admin/orders">
              <Button variant="outline">View Orders</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              View sales and customer data
            </p>
            <Link href="/admin/analytics">
              <Button variant="outline">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
