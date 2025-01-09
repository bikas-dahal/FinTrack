import { login } from '@/actions/auth/login'
import React from 'react'
import { Button } from '../ui/button'
import { FaGoogle } from 'react-icons/fa'

const SocialLogin = () => {
  return (
    <div>
        <div className="relative text-center text-sm mx-4">
                        
                        <form action={ 
            () => login()
          }>
            <Button variant="outline" type='submit' className="w-full bg-slate-300">
                  <FaGoogle className="mr-2" />
                  <span className="">Login with Google</span>
                </Button>

          </form>
                      </div>
    </div>
  )
}

export default SocialLogin