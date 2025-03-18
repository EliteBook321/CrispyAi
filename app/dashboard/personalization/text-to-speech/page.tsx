"use client"; 
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Import your button component if using Shadcn

const TextToSpeech = () => {
  const [text, setText] = useState(""); // State to store user input

  // Function to handle text-to-speech conversion
  const handleSpeak = () => {
    if (!text) {
      alert("Please enter some text to speak.");
      return;
    }

    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text); // Create a speech object
      utterance.rate = 1; // Adjust speed (1 is normal)
      utterance.pitch = 1; // Adjust pitch (1 is normal)
      utterance.volume = 1; // Adjust volume (1 is max)

      window.speechSynthesis.speak(utterance); // Speak the text
    } else {
      alert("Speech Synthesis is not supported in this browser.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-3">Text to Speech</h2>
      <textarea
        className="w-full p-3 border rounded-lg"
        rows={4}
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className="mt-3" onClick={handleSpeak}>
        Speak
      </Button>
    </div>
  );
};

export default TextToSpeech;
