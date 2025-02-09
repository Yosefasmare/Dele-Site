"use client"

import { selectUser } from "@/lib/slices/userSlice"
import { useSelector } from "react-redux"

const ServiceBtn = ({link}) => {

  const user = useSelector(selectUser)

  return (
    <button onClick={() => window.location.href = '/properties' }  className="pl-7 pr-7 p-2 border-2 border-black rounded-lg capitalize font-semibold transition-all ease-in-out hover:text-white hover:bg-black">{link}</button>
  )
}

export default ServiceBtn
