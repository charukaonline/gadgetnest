import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const stream = cloudinary.uploader.upload_stream(
    {
      folder: "gadgetnest", // optional folder in Cloudinary
    },
    (error, result) => {
      if (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Upload failed" }), {
          status: 500,
        });
      }
    }
  );

  Readable.from(buffer).pipe(stream);

  return new Promise((resolve) => {
    stream.on("finish", () => {
      resolve(NextResponse.json({ message: "Upload complete" }));
    });
  });
}
