import { auth } from '@/auth'
import Header from '@/components/util/header'
import React from 'react'
import { SessionProvider } from "next-auth/react";


const DashboardLayout = async ({ children}: {children: React.ReactNode}) => {

    const session = await auth()

  return (
    <>
        <SessionProvider session={session}>
            <Header />
            <div className='mt-16'>
                {children}
            </div>
        </SessionProvider>
    </>
  )
}

export default DashboardLayout