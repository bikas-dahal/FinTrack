'use client'

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { logout } from "@/actions/auth/logout"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

interface UserButtonProps {
    session: any
}

export const UserButton = () => {
    const session = useSession()

    console.log(session)
    const displayName = session?.data?.user.username || session?.data?.user.name
    const firstLetter = (session?.data?.user.username || session?.data?.user.name)?.charAt(0);
    const userImage = session?.data?.user?.image
    console.log(userImage)
    const imageAlt = session?.data?.user.username || session?.data?.user.name


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarFallback>{firstLetter}</AvatarFallback>
                        <AvatarImage src={userImage as string} alt={imageAlt} width={100} height={100} />
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Card className="w-[300px] flex flex-col items-center justify-center bg-slate-300 dark:bg-slate-700">
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-2 flex-col">
                                <Avatar className="">
                                    <AvatarFallback>{firstLetter}</AvatarFallback>
                                    <AvatarImage src={userImage as string} alt={imageAlt} width={60} height={100} />
                                </Avatar>
                                <h1 className="font-bold text-xl text-center">{displayName}</h1>
                                <h2 className="text-sm">{session?.data?.user.email ?? ''}</h2>
                            <DropdownMenuItem asChild onClick={() => logout()}>
                                <Button className=""  size="sm">Logout</Button>
                            </DropdownMenuItem>

                        </CardContent>
                    </Card>
                    
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}