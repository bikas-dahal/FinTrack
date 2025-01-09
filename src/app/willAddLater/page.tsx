import { Button } from "@/components/ui/button"
import Link from "next/link"

const page = () => {
  return (
    <div className="h-screen flex flex-col gap-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-opacity-15 items-center justify-center">
        <div>
        Will add later
        </div>
        <div>
            
            <Button>

            <Link href="/">Back to Home</Link>
            </Button>
        </div>
    </div>
  )
}

export default page