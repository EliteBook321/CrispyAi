'use client'
import { useEffect, useState } from 'react'
import { getCredentialStatus, type Credential } from '@/lib/blockchain-mock'
import BlockchainDiagram from './BlockchainDiagram'

// Simple progress bar component
const Progress = ({ value }: { value: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all" 
      style={{ width: `${value}%` }}
    />
  </div>
)

const verificationSteps = [
  { id: 'ipfs', name: 'IPFS Storage' },
  { id: 'blockchain', name: 'Blockchain Submission' },
  { id: 'verification', name: 'Smart Contract Verification' },
  { id: 'completed', name: 'Credential Issued' }
]

export default function CredentialStatus({ id }: { id: string | null }) {
  const [credential, setCredential] = useState<Credential | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!id) return

    const checkStatus = async () => {
      const result = await getCredentialStatus(id)
      setCredential(result)
      
      if (result?.status === 'pending') {
        const interval = setInterval(() => {
          setProgress(prev => {
            const newVal = prev + 25
            if (newVal >= 100) {
              clearInterval(interval)
              return 100
            }
            setActiveStep(Math.floor(newVal / 25))
            return newVal
          })
        }, 1500)
        
        return () => clearInterval(interval)
      } else if (result?.status === 'approved') {
        setProgress(100)
        setActiveStep(3)
      }
    }
    
    checkStatus()
  }, [id])

  return (
    <div className="space-y-6 p-6 border rounded-lg bg-white">
      <h2 className="text-xl font-semibold">Credential Verification</h2>
      
      {!id ? (
        <div className="text-center py-8 text-gray-500">
          Submit the form to generate a credential
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verification Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            {verificationSteps.map((step, i) => (
              <div key={step.id} className={`p-2 rounded ${
                i <= activeStep ? 'bg-blue-50 text-blue-600' : 'bg-gray-50'
              }`}>
                {step.name}
              </div>
            ))}
          </div>
          
          <BlockchainDiagram activeStep={activeStep} />
          
          {credential && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Recipient</h3>
                  <p>{credential.recipientName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Credential ID</h3>
                  <p className="truncate">{credential.id}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium">IPFS Hash</h3>
                <p className="truncate font-mono text-sm">{credential.ipfsHash}</p>
              </div>
              
              <div>
                <h3 className="font-medium">Blockchain TX</h3>
                <p className="truncate font-mono text-sm">{credential.txHash}</p>
              </div>
              
              <div className={`p-3 rounded-lg text-center ${
                credential.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                Status: {credential.status.toUpperCase()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}