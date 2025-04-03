'use client'
import { useState } from 'react'
import { generateCredential } from '@/lib/blockchain-mock'
import { toast } from 'sonner'
export default function CredentialForm({ onGenerate }: { onGenerate: (id: string) => void }) {
  const [formData, setFormData] = useState({
    recipientName: '',
    credentialTitle: '',
    achievement: '',
    issueDate: new Date().toISOString().split('T')[0]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      toast.info('Starting blockchain certification...')
      await new Promise(r => setTimeout(r, 1000))
      toast.info('Storing to IPFS...')
      await new Promise(r => setTimeout(r, 1500))
      const credential = await generateCredential(formData)
      onGenerate(credential.id)
      toast.success('Credential minted on blockchain!', {
        description: `TX Hash: ${credential.txHash}`
      })
    } catch (error) {
      toast.error('Blockchain operation failed', {
        description: error instanceof Error ? error.message : 'Network error'
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="space-y-6 p-6 border rounded-lg bg-white">
      <h2 className="text-xl font-semibold">Generate Blockchain Credential</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Recipient Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.recipientName}
              onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Credential Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.credentialTitle}
              onChange={(e) => setFormData({...formData, credentialTitle: e.target.value})}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Achievement Description</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={formData.achievement}
            onChange={(e) => setFormData({...formData, achievement: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Issue Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={formData.issueDate}
            onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Minting Credential...' : 'Generate Blockchain Credential'}
        </button>
      </form>
    </div>
  )
}
