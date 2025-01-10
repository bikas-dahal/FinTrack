import Link from "next/link"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface NavbuttonProps {
    href: string
    label: string
    isActive: boolean
}

const Navbutton = ({href, label, isActive}: NavbuttonProps) => {
  return (
    <Button asChild size={"default"} variant={"outline"} 
    className={cn(
      "w-full lg:w-auto border-none focus-visible:ring-offset-0 transition-all",
      "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
     isActive && "text-gray-900 dark:text-gray-50" 
  )}>
      <Link href={href}>{label}</Link>
    </Button>
  )
}

export default Navbutton