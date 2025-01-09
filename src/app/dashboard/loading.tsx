import { Loader2Icon } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <Loader2Icon size={48} className='animate-spin' />
    </div>
  )
}

export default LoadingPage