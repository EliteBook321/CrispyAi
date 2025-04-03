"use client";

import { useState } from "react";
import axios from "axios";

const TextToSummary = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await axios.post("/api/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(response.data.summary || "No summary available.");
    } catch (error) {
      setError("Failed to summarize document.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4">📄 Text-to-Summary</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} className="mb-4 w-full" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          🔍 Summarize
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {summary && (
        <div className="mt-4 p-4 bg-gray-200 rounded-md">
          <h3 className="font-medium">Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default TextToSummary;
