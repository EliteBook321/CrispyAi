"use client";

import { useState } from "react";

// Get API key from environment variables
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;

export default function ClassroomActivityGenerator() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [activity, setActivity] = useState("");
  const [caseStudy, setCaseStudy] = useState("");
  const [rolePlay, setRolePlay] = useState("");
  const [debate, setDebate] = useState("");
  const [error, setError] = useState("");

  // Function to call Google Gemini AI API
  const callAI = async (prompt: string, setState: any) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: prompt, // Corrected format
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${errorData.error.message}`);
      }

      const data = await response.json();
      setState(data.candidates?.[0]?.output || "No response from AI.");
    } catch (err: any) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎓 Classroom Activity & Case Study Generator</h1>

      {/* Subject & Topic Input */}
      <div className="mb-6">
        <label className="block text-lg font-semibold">📚 Enter Subject:</label>
        <input
          type="text"
          placeholder="e.g., Science, History, Economics"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 w-full rounded-md"
        />

        <label className="block text-lg font-semibold mt-4">📖 Enter Topic:</label>
        <input
          type="text"
          placeholder="e.g., Climate Change, World War II"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-2 w-full rounded-md"
        />
      </div>

      {/* Generate Buttons */}
      <div className="mb-6">
        <button
          onClick={() => callAI(`Generate an interactive classroom activity for ${subject} on the topic of ${topic}.`, setActivity)}
          className="bg-blue-500 text-white p-2 rounded-md w-full mt-2"
        >
          🎭 Generate Classroom Activity
        </button>

        <button
          onClick={() => callAI(`Generate a case study for ${subject} on the topic of ${topic}.`, setCaseStudy)}
          className="bg-green-500 text-white p-2 rounded-md w-full mt-2"
        >
          📖 Generate Case Study
        </button>

        <button
          onClick={() => callAI(`Suggest a role-playing scenario for ${subject} on the topic of ${topic}.`, setRolePlay)}
          className="bg-purple-500 text-white p-2 rounded-md w-full mt-2"
        >
          🎭 Generate Role-Playing Scenario
        </button>

        <button
          onClick={() => callAI(`Suggest a debate topic for ${subject} on the topic of ${topic}.`, setDebate)}
          className="bg-red-500 text-white p-2 rounded-md w-full mt-2"
        >
          🗣️ Generate Debate Topic
        </button>
      </div>

      {/* Display Results */}
      <div className="mb-6">
        {activity && (
          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <h3 className="text-lg font-semibold">🎭 Classroom Activity:</h3>
            <p>{activity}</p>
          </div>
        )}

        {caseStudy && (
          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <h3 className="text-lg font-semibold">📖 Case Study:</h3>
            <p>{caseStudy}</p>
          </div>
        )}

        {rolePlay && (
          <div className="p-4 bg-gray-100 rounded-md mb-4">
            <h3 className="text-lg font-semibold">🎭 Role-Playing Scenario:</h3>
            <p>{rolePlay}</p>
          </div>
        )}

        {debate && (
          <div className="p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold">🗣️ Debate Topic:</h3>
            <p>{debate}</p>
          </div>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
