'use client'

import { useState, useEffect } from 'react'

export default function SignLanguagePlayer() {
  const [text, setText] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsPlaying(false)
            return 100
          }
          return prev + 2
        })
      }, 100)
    }
    
    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePlay = () => {
    setProgress(0)
    setIsPlaying(true)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign Language Translator</h1>
      
      <textarea
        className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={5}
        placeholder="Enter text to convert to sign language..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <button
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          !text || isPlaying
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        onClick={handlePlay}
        disabled={!text || isPlaying}
      >
        {isPlaying ? 'Converting...' : 'Convert to Sign Language'}
      </button>
      
      <div className="mt-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 text-center">
          {isPlaying ? 'Generating sign language animation...' : 'Ready for conversion'}
        </p>
        
        <div className="mt-6 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          {isPlaying ? (
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">👐</span>
              </div>
              <p>Playing sign language for: "{text}"</p>
            </div>
          ) : (
            <p className="text-gray-500">Sign language animation will appear here</p>
          )}
        </div>
      </div>
    </div>
  )
}