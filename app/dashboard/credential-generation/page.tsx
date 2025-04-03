'use client' // Essential for client-side hooks

import { useState } from 'react' // Added missing import
import { Suspense } from 'react'
import CredentialForm from './components/CredentialForm'
import CredentialStatus from './components/CredentialStatus'

export default function CredentialGenerationPage() {
  const [generatedId, setGeneratedId] = useState<string | null>(null) // Fixed typo in variable name (generatedId)

  return (
    <div className="max-w-4xl mx-auto py-8 px-4"> {/* Fixed 4x1 to 4xl and 2x1 to 2xl */}
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Blockchain Credential Generation</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CredentialForm onGenerate={setGeneratedId} />
        <Suspense fallback={<div>Loading status...</div>}>
          <CredentialStatus id={generatedId} />
        </Suspense>
      </div>
    </div>
  )
}