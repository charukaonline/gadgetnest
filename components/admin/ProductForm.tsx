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
import { Loader2 } from "lucide-react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

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

      if (!res.ok) throw new Error("Failed to upload image");

      const data = await res.json();
      setImageUrl(data.secure_url);
      setMessage({ type: "success", content: "Image uploaded successfully!" });
    } catch (error) {
      setMessage({ type: "error", content: "Failed to upload image" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", content: "" });

    try {
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

      if (!res.ok) throw new Error("Failed to add product");

      setMessage({ type: "success", content: "Product added successfully!" });
      setName("");
      setDesc("");
      setPrice("");
      setCategory("");
      setImageUrl("");
    } catch (error) {
      setMessage({
        type: "error",
        content: "Error adding product. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      {message.content && (
        <div
          className={`p-4 rounded-md ${
            message.type === "success"
              ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {message.content}
        </div>
      )}

      <div className="space-y-5">
        <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              placeholder="Enter product description"
              className="min-h-[120px]"
            />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-lg font-medium border-b pb-2">Product Details</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category" className="w-full">
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
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-lg font-medium border-b pb-2">Product Image</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" onChange={handleImageUpload} />

            {loading && (
              <div className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading image...</span>
              </div>
            )}

            {imageUrl && (
              <div className="mt-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-900">
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="h-48 w-auto object-contain mx-auto rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-11 text-base font-medium"
        disabled={submitting || loading}
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding Product...
          </>
        ) : (
          "Add Product"
        )}
      </Button>
    </form>
  );
}
