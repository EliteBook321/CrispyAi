"use client";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";  
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {   
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-6 bg-gray-100 dark:bg-gray-900 transition duration-300">
      {/* Dark Mode Toggle */}
      <button 
        onClick={() => setDarkMode(!darkMode)} 
        className="absolute top-5 right-5 px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black rounded-md shadow-md"
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Logo */}
      <Image src={'/logo.svg'} alt='logo' width={150} height={150} className="dark:brightness-90" />

      {/* App Name */}
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-black to-blue-600 text-transparent bg-clip-text dark:from-white dark:to-blue-400 tracking-wide">
        CHRISPY AI
      </h2>

      {/* Get Started Button */}
      <Button 
        className="px-8 py-4 text-xl font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 shadow-md" 
        onClick={() => router.push("/dashboard")}
      >
        Get Started
      </Button>
    </div>
  );
}
