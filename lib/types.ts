// lib/types.ts
export interface Credential {
    id: string
    title: string
    recipient: string
    content: string
    date: string
    hash: string
    ipfsHash: string
    status: 'pending' | 'approved' | 'rejected'
  }