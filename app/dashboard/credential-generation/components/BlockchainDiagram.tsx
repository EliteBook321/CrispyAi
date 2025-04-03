'use client'
import React from 'react'

export default function BlockchainDiagram({ activeStep }: { activeStep: number }) {
  const steps = [
    { id: 'generation', name: 'Credential Generation', icon: '🛠️' },
    { id: 'ipfs', name: 'IPFS Storage', icon: '🗄️' },
    { id: 'blockchain', name: 'Blockchain Submission', icon: '⛓️' },
    { id: 'verification', name: 'Verification', icon: '✅' }
  ]

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-4">Blockchain Process Flow</h3>
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex items-start">
              <div className={`absolute left-4 top-5 -ml-0.5 h-8 w-0.5 ${
                index === steps.length - 1 ? 'bg-transparent' : 
                index <= activeStep ? 'bg-blue-500' : 'bg-gray-200'
              }`} />
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                index <= activeStep ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}>
                {step.icon}
              </div>
              <div className="ml-4">
                <h4 className={`text-sm ${
                  index <= activeStep ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}>
                  {step.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {index <= activeStep ? 'Completed' : 'Pending'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}