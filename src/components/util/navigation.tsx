'use client'

import { usePathname, useRouter } from "next/navigation"
import Navbutton from "./nav-button"
import { useState } from "react"
import { useMedia } from "react-use"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"

export const Navigation = () => {

    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const isMobile = useMedia('(max-width: 768px)')

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    }

    const pathname = usePathname()

    const routes = [
        {
            href: '/dashboard',
            label: 'Home'
        },
        {
            href: '/dashboard/transactions',
            label: 'Transactions'
        },
        {
            href: '/dashboard/budgets',
            label: 'Budgets'
        },
        {
            href: '/dashboard/portfolio',
            label: 'Portfolio'
        },
        {
            href: '/dashboard/categories',
            label: 'Categories'
        },
        {
            href: '/dashboard/settings',
            label: 'Settings'
        }
    ]

    const isActivePath = (href: string) => {
        return pathname === href
    }

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button 
                        size={'sm'} 
                        variant={'outline'} 
                        className="font-normal bg-white/10 focus:bg-white/30  hover:bg-white/20 hover:text-white/100 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent transition-all"
                    >
                        <MenuIcon size={24} />
                    </Button>
                </SheetTrigger>
                <SheetContent side={'left'} className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button key={route.href}  className="w-full justify-start" variant={isActivePath(route.href) ? 'secondary' : 'outline'} size={'sm'} onClick={() => onClick(route.href)}>
                                {route.label}
                            </Button> 
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        )
    }

    

    return (
        <nav className="hidden md:flex items-center gap-x-2 overflow-x-auto">
            {routes.map((route) => (
                <>
                   
                    <Navbutton key={route.href} href={route.href} label={route.label} isActive={isActivePath(route.href)} />
                </>
            ))}
        </nav>
    )
}