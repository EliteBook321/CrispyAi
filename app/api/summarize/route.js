import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs/promises";

export async function POST(req) {
  try {
    console.log("Received request at /api/summarize");

    // Ensure request is multipart/form-data
    if (!req.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
    }

    // Parse file upload using formidable
    const form = new formidable.IncomingForm({ multiples: false });
    const [fields, files] = await form.parse(req);

    console.log("Received file:", files.document?.filepath);

    if (!files.document) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Read file content (assuming it's text)
    const fileContent = await fs.readFile(files.document.filepath, "utf-8");

    // Simulate summarization (replace with actual logic)
    const summary = `Summarized content: ${fileContent.substring(0, 100)}...`;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Error in /api/summarize:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false, // Required for handling file uploads
  },
};
