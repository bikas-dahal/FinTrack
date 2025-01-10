import { auth } from '@/auth'
import Header from '@/components/util/header'
import React from 'react'
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from '@/components/providers/query-provider';
import { SheetProvider } from '@/components/providers/sheet-provider';


const DashboardLayout = async ({ children}: {children: React.ReactNode}) => {

    const session = await auth()

  return (
    <>
        <QueryProvider>
          <SessionProvider session={session}>
              <Header />
              <div className='max-w-screen-xl mx-auto'>
                <SheetProvider />
                  {children}
              </div>
          </SessionProvider>
        </QueryProvider>
    </>
  )
}

export default DashboardLayout