"use client";
import { useState } from "react";
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

export default function ProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setImageUrl(data.secure_url);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      name,
      desc,
      price: parseFloat(price),
      category,
      image: imageUrl,
      createdAt: new Date(),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      alert("Product added!");
      setName("");
      setDesc("");
      setPrice("");
      setCategory("");
      setImageUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <div>
        <Label>Product Name</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Price ($)</Label>
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <Label>Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="laptop">Laptop</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="accessory">Accessory</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Product Image</Label>
        <Input type="file" onChange={handleImageUpload} />
        {loading && (
          <p className="text-sm text-muted-foreground">Uploading...</p>
        )}
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded" className="h-32 mt-2 rounded-md" />
        )}
      </div>
      <Button type="submit" className="w-full">
        Add Product
      </Button>
    </form>
  );
}
