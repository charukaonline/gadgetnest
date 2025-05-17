import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

// Get a specific product by ID
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = docSnap.data();

    return NextResponse.json({
      id: docSnap.id,
      ...productData,
      createdAt: productData.createdAt?.toDate() || null,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// Update a product
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await req.json();
    const docRef = doc(db, "products", id);

    // Add updatedAt timestamp
    const updateData = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(docRef, updateData);

    return NextResponse.json({
      id,
      ...updateData,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

// Delete a product
export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const docRef = doc(db, "products", id);

    await deleteDoc(docRef);

    return NextResponse.json({
      id,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
