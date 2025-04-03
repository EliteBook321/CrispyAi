interface Credential {
    id: string
    recipientName: string
    credentialTitle: string
    issueDate: string
    ipfsHash: string
    txHash: string
    status: 'pending' | 'approved' | 'rejected'
    createdAt: Date
  }
  
  const mockCredentials: Credential[] = []
  
  export const generateCredential = async (data: {
    recipientName: string
    credentialTitle: string
    achievement: string
    issueDate: string
  }): Promise<Credential> => {
    // Simulate IPFS upload
    await new Promise(r => setTimeout(r, 1000))
    const ipfsHash = `Qm${Math.random().toString(36).substring(2, 22)}`
    
    // Simulate blockchain tx
    await new Promise(r => setTimeout(r, 1500))
    const txHash = `0x${Math.random().toString(16).substring(2, 66)}`
    
    const newCredential: Credential = {
      id: `cred-${Math.random().toString(36).substring(2, 10)}`,
      ...data,
      ipfsHash,
      txHash,
      status: 'pending',
      createdAt: new Date()
    }
    
    mockCredentials.push(newCredential)
    
    // Simulate blockchain confirmation
    setTimeout(() => {
      const index = mockCredentials.findIndex(c => c.id === newCredential.id)
      if (index !== -1) {
        mockCredentials[index].status = Math.random() > 0.1 ? 'approved' : 'rejected'
      }
    }, 5000)
    
    return newCredential
  }
  
  export const getCredentialStatus = async (id: string): Promise<Credential | null> => {
    await new Promise(r => setTimeout(r, 500))
    return mockCredentials.find(c => c.id === id) || null
  }