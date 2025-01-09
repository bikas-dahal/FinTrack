import { getUserSession } from "@/actions/auth/session"
import { auth } from "@/auth"
import LoginForm from "@/components/auth/login-form"
import { redirect } from "next/navigation"


const LoginPage = async () => {

  const session = await auth()
  
  if (session?.user) {
    return redirect("/dashboard")
  }

  return (
    <div className="flex min-h-svh  items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage