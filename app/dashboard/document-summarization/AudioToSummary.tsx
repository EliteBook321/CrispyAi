"use client";

import { useState } from "react";
import axios from "axios";

const AudioToSummary = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
    setSummary(null);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file.");
      return;
    }

    setLoading(true);
    setError(null);
    setSummary(null);

    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post("/api/summarize-audio", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ API Response:", response.data);

      if (response.data?.summary) {
        setSummary(response.data.summary);
      } else {
        setError("Invalid response from server.");
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
      setError("Failed to summarize audio. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">🎙️ Audio-to-Summary</h2>

      {/* File Upload */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full py-2 rounded-md text-white ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
        }`}
      >
        {loading ? "⏳ Processing..." : "📤 Upload & Summarize"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Display Summary */}
      {summary && (
        <div className="mt-4 p-4 bg-gray-200 rounded-md">
          <h3 className="font-medium">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default AudioToSummary;
