import { getUserSession } from '@/actions/auth/session'
import { Dashboard } from '@/components/util/dashboard'
import { useNewPortfolio } from '@/features/portfolio/hooks/use-new-portfolio'
import React from 'react'

const DashboardPage = async () => {
  const session = await getUserSession()

  

  return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome {session?.username || session?.name}</p>
        <Dashboard />
    </div>
  )
}

export default DashboardPage