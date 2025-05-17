import { NextRequest, NextResponse } from "next/server";
import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Convert string date to Firestore Timestamp
    const productData = {
      ...data,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "products"), productData);

    return NextResponse.json({
      id: docRef.id,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || null,
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
