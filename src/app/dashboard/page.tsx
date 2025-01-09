import { getUserSession } from '@/actions/auth/session'
import React from 'react'

const DashboardPage = async () => {
  const session = await getUserSession()

  return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome {session?.username || session?.name}</p>
    </div>
  )
}

export default DashboardPage