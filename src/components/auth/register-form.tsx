'use client'

import React, { useTransition } from 'react'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import SocialLogin from './social'
import { AuthSchema, AuthType } from '@/schema/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/auth/register'
import { toast } from 'sonner'

const RegisterForm = () => {

  const [isPending, startTransition] = useTransition()
      
      const {register, handleSubmit, formState: {errors}, reset} = useForm<AuthType>({
          resolver: zodResolver(AuthSchema),
          defaultValues: {
            username: '',
            password: '',
          }
        })

      const onSubmit = async (data: AuthType) => {
        startTransition( async () => {
          try {
            const res = await registerUser(data)
            // reset()
            console.log(res)
            
          } catch (error) {
            console.log(error)
            toast.error(error.message as string)
          }
          
        }
      )
      }


  return (
    <div className={"flex flex-col items-center justify-center gap-6"}>
      <Card className="overflow-hidden md:w-[400px]">
        <CardContent className="grid p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome to <span className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>FinTrack</span></h1>
                <p className="text-balance text-muted-foreground">
                  Create an account 🤗
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  {...register('username')}
                  type="text"
                  placeholder="syam"
                  required
                />
              </div>
              {errors.username && <span className='text-red-500'>{errors.username.message}</span>}

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" {...register('password')} type="password" required />
              </div>
              {/* eroor message */}
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
              <Button disabled={isPending} type="submit" className="w-full">
                Register your account
              </Button>
            </div>
          </form>
          <SocialLogin />
              <div className="text-center text-sm p-3 ">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>

          

          
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <Link href="/willAddLater">Terms of Service</Link>{" "}
        and <Link href="/willAddLater">Privacy Policy</Link>.
      </div>
    </div>
  )
}

export default RegisterForm