"use client"; // Ensures this runs only on the client side
import React, { useState, useEffect } from "react";
import "@fontsource/opendyslexic"; // Import OpenDyslexic font

const SpeechToSpeech: React.FC = () => {
  const [spokenText, setSpokenText] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");
  const [ttsText, setTtsText] = useState<string>("");
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [speechRate, setSpeechRate] = useState<number>(1);
  const [speechPitch, setSpeechPitch] = useState<number>(1);
  const [inputText, setInputText] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const synth = window.speechSynthesis;
      const updateVoices = () => setVoices(synth.getVoices());
      synth.onvoiceschanged = updateVoices;
      updateVoices();
    }
  }, []);

  const handleSpeechInput = () => {
    if (typeof window !== "undefined") {
      const recognition = new (window as any).webkitSpeechRecognition() || new (window as any).SpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event: any) => {
        const userSpeech = event.results[0][0].transcript;
        setSpokenText(userSpeech);
        generateResponse(userSpeech);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };
    }
  };

  const generateResponse = (text: string) => {
    let response = "I didn't understand that.";
    if (text.toLowerCase().includes("hello")) response = "Hello! How can I help you?";
    if (text.toLowerCase().includes("time")) response = `The current time is ${new Date().toLocaleTimeString()}.`;

    setResponseText(response);
    speakResponse(response);
  };

  const speakResponse = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const synth = window.speechSynthesis;
      synth.cancel(); // Stop ongoing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;

      if (selectedVoice) {
        utterance.voice = voices.find((v) => v.name === selectedVoice) || null;
      }

      const words = text.split(" ");
      let wordIndex = 0;

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          wordIndex = event.charIndex;
          const before = text.substring(0, wordIndex);
          const current = words.find((w, i) => text.indexOf(w) === wordIndex) || "";
          const after = text.substring(wordIndex + current.length);
          setHighlightedText(`<span>${before}</span><mark>${current}</mark><span>${after}</span>`);
        }
      };

      synth.speak(utterance);
    }
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setHighlightedText(""); // Reset highlighted text when stopped
    }
  };

  useEffect(() => {
    if (ttsText) speakResponse(ttsText);
  }, [selectedVoice, speechRate, speechPitch]);

  return (
    <div className={`min-h-screen p-10 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700"}`}>
      <button
        className="absolute top-4 right-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className={`w-full md:w-1/2 p-8 shadow-lg rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
          <h2 className="text-3xl font-semibold mb-6">🎤 Speech-to-Speech</h2>
          <button className="w-full bg-green-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition" onClick={handleSpeechInput}>🎙️ Speak Now</button>
          {spokenText && <p className="mt-6 text-lg font-medium"><strong>You said:</strong> {spokenText}</p>}
          {responseText && <p className="mt-4 text-lg font-medium text-blue-400"><strong>Response:</strong> {responseText}</p>}
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <div className={`p-8 shadow-lg rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-3xl font-semibold mb-6">🔊 Text-to-Speech</h2>
            <textarea className={`w-full p-4 border rounded-lg text-lg focus:ring ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`} placeholder="Enter text to convert to speech..." value={ttsText} onChange={(e) => setTtsText(e.target.value)} />
            <div className="mt-4 flex gap-4">
              <button className="w-1/2 bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition" onClick={() => speakResponse(ttsText)}>🔊 Speak</button>
              <button className="w-1/2 bg-red-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-red-700 transition" onClick={stopSpeech}>🛑 Stop</button>
            </div>

            {/* Highlighted Text Display */}
            <div className="mt-4 p-4 border rounded-lg text-lg bg-gray-200" dangerouslySetInnerHTML={{ __html: highlightedText || "Your text will be highlighted here as it is spoken..." }} />

            <div className="mt-4">
              <label className="block text-lg font-medium">Select Voice:</label>
              <select className="w-full p-2 border rounded-lg" onChange={(e) => setSelectedVoice(e.target.value)}>
                <option value="">Default</option>
                {voices.map((voice, index) => (<option key={index} value={voice.name}>{voice.name}</option>))}
              </select>
            </div>

            {/* Speed & Pitch Controls */}
            <div className="mt-4">
              <label className="block text-lg font-medium">Speech Speed:</label>
              <input type="range" min="0.5" max="2" step="0.1" value={speechRate} onChange={(e) => setSpeechRate(parseFloat(e.target.value))} className="w-full" />
            </div>

            <div className="mt-4">
              <label className="block text-lg font-medium">Speech Pitch:</label>
              <input type="range" min="0.5" max="2" step="0.1" value={speechPitch} onChange={(e) => setSpeechPitch(parseFloat(e.target.value))} className="w-full" />
            </div>
          </div>

          {/* OpenDyslexic Text Converter */}
          <div className="p-8 shadow-lg rounded-lg bg-white">
            <h2 className="text-3xl font-semibold mb-6">🔤 OpenDyslexic Text</h2>
            <textarea className="w-full p-4 border rounded-lg text-lg" placeholder="Enter text here..." value={inputText} onChange={(e) => setInputText(e.target.value)} />
            <div className="mt-6 p-4 bg-gray-200 border rounded-lg text-lg" style={{ fontFamily: "OpenDyslexic, sans-serif" }}>
              {inputText || "Your OpenDyslexic text will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechToSpeech;
