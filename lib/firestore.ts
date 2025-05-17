import { db } from "@/firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}
