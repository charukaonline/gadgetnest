import { db } from "@/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const docRef = await addDoc(collection(db, "products"), data);
    return NextResponse.json({ id: docRef.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
