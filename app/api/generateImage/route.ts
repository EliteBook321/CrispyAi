import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }
        console.log("HUGGINGFACE_API_KEY:", process.env.HUGGINGFACE_API_KEY);


        const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
        if (!HUGGINGFACE_API_KEY) {
            return NextResponse.json({ error: "Missing API Key" }, { status: 500 });
        }

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
            { inputs: prompt },
            {
                headers: {
                    Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching image:", error);
        return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
    }
}