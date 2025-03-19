"use client";
import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Gemini API

type Question = {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  answer: string | string[];
};

const InterviewPrepPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("HR");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Easy");

  // AI Mock Interview States
  const [recording, setRecording] = useState<boolean>(false);
  const [transcribedAnswer, setTranscribedAnswer] = useState<string>("");
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const filteredQuestions = questions.filter(
    (q) => q.category === selectedCategory && q.difficulty === selectedDifficulty
  );

  // 🎤 Speech-to-Text Function (Only for HR)
  const startRecording = () => {
    if (selectedCategory !== "HR") return; // Prevent recording in Coding

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setRecording(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscribedAnswer(transcript);
    };
    recognition.onend = () => setRecording(false);
    recognition.start();
  };

  // 🧠 Send answer to Gemini API for feedback (Only for HR)
  const getAiFeedback = async () => {
    if (!transcribedAnswer || selectedCategory !== "HR") return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Evaluate this interview answer: "${transcribedAnswer}". 
    Provide feedback on clarity, confidence, and grammar. 
    Give a score from 1-10 and a suggestion for improvement.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiResponse = response.text();

      // Extract score (1-10)
      const matchScore = aiResponse.match(/\d+/);
      setAiFeedback(aiResponse);
      setScore(matchScore ? parseInt(matchScore[0]) : null);
    } catch (error) {
      console.error("Error getting AI feedback:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 AI-Powered Interview Prep</h1>

      {/* Category Selector */}
      <label className="mr-2 font-semibold">Category:</label>
      <select
        className="border p-2 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="HR">HR</option>
        <option value="Coding">Coding</option>
      </select>

      {/* Difficulty Selector */}
      <label className="ml-4 mr-2 font-semibold">Difficulty:</label>
      <select
        className="border p-2 rounded"
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      {/* Display Questions */}
      <div className="mt-6">
        {filteredQuestions.map((q) => (
          <div key={q.id} className="bg-gray-100 p-4 rounded shadow mb-4">
            <h2 className="text-lg font-semibold">❓ {q.question}</h2>

            {/* Check if answer is an array */}
            {Array.isArray(q.answer) ? (
              <ul className="mt-2 list-disc pl-5">
                {q.answer.map((item, index) => (
                  <li key={index} className="mt-1">{item}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-gray-700">{q.answer}</p>
            )}

            {/* 🎤 AI-Powered Mock Interview (Only for HR) */}
            {selectedCategory === "HR" && (
              <>
                <div className="mt-4">
                  <button
                    onClick={startRecording}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    {recording ? "Listening..." : "🎤 Speak Answer"}
                  </button>
                </div>

                {/* Display Transcribed Answer */}
                {transcribedAnswer && (
                  <div className="mt-3 p-2 bg-gray-200 rounded">
                    <strong>Your Answer:</strong> {transcribedAnswer}
                  </div>
                )}

                {/* AI Feedback Button */}
                {transcribedAnswer && (
                  <button
                    onClick={getAiFeedback}
                    className="mt-3 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    🤖 Get AI Feedback
                  </button>
                )}

                {/* AI Feedback & Score */}
                {aiFeedback && (
                  <div className="mt-4 p-3 bg-yellow-100 rounded">
                    <strong>AI Feedback:</strong> {aiFeedback}
                    {score !== null && <p>📝 Score: {score}/10</p>}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrepPage;
