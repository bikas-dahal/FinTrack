import React from 'react'
import { ModeToggle } from './theme-switcher'
import { UserButton } from '../auth/user-button'
import { getUserSession } from '@/actions/auth/session'
import { HeaderLogo } from './header-logo'
import { Navigation } from './navigation'
import { Welcome } from './welcome'

const Header = async () => {

    const session = await getUserSession()


  return (
    <header className=' border-b backdrop-blur-md mx-5 px-4 py-2'>
        <div className='mx-auto flex flex-col items-center max-w-screen-xl justify-between'>

            <div className='w-full items-center flex justify-between mb-2'>
                <div className="flex items-center lg:gap-x-16">
                    <HeaderLogo />
                    <Navigation />
                </div>
                <div className='flex items-center gap-2'>
                    <ModeToggle />
                    <UserButton  />
                </div>
            </div>
            <div className='w-full'>
                <Welcome />
            </div>
            
        </div>
    </header>
  )
}

export default Header