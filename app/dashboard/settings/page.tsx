import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function SettingsPage() { // 🔹 Renamed from `Settings` to `SettingsPage` to avoid conflicts
  return (
    <div className='flex items-center justify-center h-full'>
        <UserProfile routing="hash" />
    </div>
  )
}

export default SettingsPage;
