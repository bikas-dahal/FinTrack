import { auth } from "@/auth"
import RegisterForm from "@/components/auth/register-form"
import { redirect } from "next/navigation"

const RegisterPage = async () => {

  const session = await auth()

  if (session?.user) {
    return redirect("/dashboard")
  }
    
  return (
    <div className="flex min-h-svh  items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full">
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage