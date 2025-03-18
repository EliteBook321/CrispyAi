"use client";
import React, { useState } from "react";
import axios from "axios";

const D_ID_API_KEY = process.env.NEXT_PUBLIC_DID_API_KEY || "";

const TextToVideo: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateVideo = async () => {
    if (!text.trim()) {
      setError("Please enter some text.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      // Step 1: Send request to D-ID API to generate the video
      const response = await axios.post(
        "https://api.d-id.com/talks",
        {
          script: {
            type: "text",
            input: text,
            provider: { type: "microsoft", voice_id: "en-US-AriaNeural" }, // AI voice
          },
          source_url: "https://d-id.com/example.jpg", // Avatar image URL
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${D_ID_API_KEY}`,
          },
        }
      );

      console.log("Video Generation Started:", response.data);
      const videoId = response.data.id;

      // Step 2: Check the status of the video
      const checkStatus = async () => {
        try {
          const statusResponse = await axios.get(
            `https://api.d-id.com/talks/${videoId}`,
            {
              headers: {
                Authorization: `Bearer ${D_ID_API_KEY}`,
              },
            }
          );
          if (statusResponse.data.status === "done") {
            setVideoUrl(statusResponse.data.result_url); // Set video URL
            setLoading(false);
          } else {
            setTimeout(checkStatus, 5000); // Retry after 5 seconds
          }
        } catch (err) {
          console.error("Error checking video status:", err);
          setError("Failed to generate video.");
          setLoading(false);
        }
      };

      checkStatus();
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to generate video. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Text to AI Video Generator</h2>
      <textarea
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
        placeholder="Enter text for AI animation..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        onClick={handleGenerateVideo}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Video"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {videoUrl && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Generated Video:</h3>
          <video controls src={videoUrl} className="w-full mt-3 rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
};

export default TextToVideo;
