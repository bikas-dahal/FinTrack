import { getUserSession } from '@/actions/auth/session'
import { DataCharts } from '@/components/data-charts'
import { Dashboard } from '@/components/util/dashboard'
import React from 'react'

const DashboardPage = async () => {
  const session = await getUserSession()
  return (
    <div className='max-w-screen-xl mx-auto'>
        <div className='mx-10'>
          <Dashboard />
          <DataCharts />
        </div>
    </div>
  )
}

export default DashboardPage