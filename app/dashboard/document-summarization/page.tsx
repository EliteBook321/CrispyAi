"use client"
import { useState } from 'react';
import axios from 'axios';

// Define the expected structure of the response
interface SummarizationResponse {
  summary: string;
}

const DocumentSummarization = () => {
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Type the response as SummarizationResponse
      const data = response.data as SummarizationResponse; // Explicitly casting response to the expected type

      if (data.summary) {
        setSummary(data.summary);
      }
    } catch (error) {
      setError("Failed to summarize document.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Document Summarization</h1>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Summarize</button>
      </form>

      {error && <p>{error}</p>}
      {summary && (
        <div>
          <h2>Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentSummarization;
