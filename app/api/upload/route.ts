import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "gadgetnest" },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            reject(
              NextResponse.json({ error: "Upload failed" }, { status: 500 })
            );
          } else if (result) {
            resolve(
              NextResponse.json({
                secure_url: result.secure_url,
                public_id: result.public_id,
              })
            );
          } else {
            reject(
              NextResponse.json(
                { error: "No result from upload" },
                { status: 500 }
              )
            );
          }
        }
      );
      // Create a readable stream from the buffer
      const readable = new Readable();
      readable.push(buffer);
      readable.push(null); // Signal the end of the stream
      readable.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Request processing error:", error);
    return NextResponse.json(
      { error: "Failed to process upload" },
      { status: 500 }
    );
  }
}
