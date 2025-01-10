import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const HeaderLogo = () => {
  return (
    <Link href='/'>
      <h1 className='text-2xl font-bold hidden md:block'>
        FinTrack
      </h1>
    </Link>
  )
}

