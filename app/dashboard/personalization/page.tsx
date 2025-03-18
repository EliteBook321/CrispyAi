"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Personalization = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Personalization Options</h1>
      <p className="text-gray-700 mb-6">Choose how you want to learn:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text-to-Speech Option */}
        <div className="p-4 border rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">🗣️ Text to Speech</h2>
          <p className="text-gray-600">Listen to the content instead of reading.</p>
          <Link href="/dashboard/personalization/text-to-speech">
            <Button className="mt-3">Try Now</Button>
          </Link>
        </div>

        {/* Text-to-Video Option */}
        <div className="p-4 border rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">🎥 Text to Video</h2>
          <p className="text-gray-600">Convert text into engaging videos.</p>
          <Link href="/dashboard/personalization/text-to-video">
            <Button className="mt-3">Try Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Personalization;
