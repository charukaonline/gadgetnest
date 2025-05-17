"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductEditFormProps {
  product: {
    id: string;
    name: string;
    desc: string;
    price: number;
    category: string;
    image: string;
  };
}

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();
  const [name, setName] = useState(product.name);
  const [desc, setDesc] = useState(product.desc);
  const [price, setPrice] = useState(product.price.toString());
  const [category, setCategory] = useState(product.category);
  const [imageUrl, setImageUrl] = useState(product.image);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const updatedProduct = {
      name,
      desc,
      price: parseFloat(price),
      category,
      image: imageUrl,
      updatedAt: new Date(),
    };

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="desc">Description</Label>
        <Textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="price">Price ($)</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="laptop">Laptop</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="accessory">Accessory</SelectItem>
            <SelectItem value="tablet">Tablet</SelectItem>
            <SelectItem value="wearable">Wearable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="image">Product Image</Label>
        <div className="mt-2">
          {imageUrl && (
            <div className="mb-3">
              <img
                src={imageUrl}
                alt={name}
                className="h-32 w-auto object-contain rounded-md"
              />
            </div>
          )}
          <Input id="image" type="file" onChange={handleImageUpload} />
          {loading && (
            <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting || loading}>
          {submitting ? "Updating..." : "Update Product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
