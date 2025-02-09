'use client'

import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { IoIosLogOut } from "react-icons/io"

const LogOutBtn = () => {
    const router = useRouter()

    const handleSignOut = () => {
        auth.signOut()
        router.push('/')
    }

  return (
    <button className="flex gap-3 justify-center items-center bg-gray-700 rounded-lg p-3 px-5" onClick={handleSignOut}>
      <span className="text-white font-semibold text-xl">logout</span>
      <IoIosLogOut size={20} color="white"/>
    </button>
   
  )
}

export default LogOutBtn
