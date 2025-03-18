"use client";
import React, { useEffect, useState } from "react";

type Question = {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  answer: string;
};

const InterviewPrepPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("HR");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("Easy");

  useEffect(() => {
    fetch("/data/questions.json")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const filteredQuestions = questions.filter(
    (q) => q.category === selectedCategory && q.difficulty === selectedDifficulty
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📝 Interview Prep</h1>

      {/* Category Selector */}
      <label className="mr-2 font-semibold">Category:</label>
      <select
        className="border p-2 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="HR">HR</option>
        <option value="Technical">Technical</option>
        <option value="Coding">Coding</option>
        <option value="Company-Specific">Company-Specific</option>
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
            <p className="mt-2 text-gray-700">💡 <strong>Answer:</strong> {q.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrepPage;

