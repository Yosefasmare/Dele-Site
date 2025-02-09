"use client"

import Link from "next/link";
import { MdOutlineClear } from "react-icons/md";

const FormResetBtn = () => {

     const reset = () =>{
            const form = document.getElementById('search-from')
    
            if(form)  form.value = ''
        }

  return (
  <Link href='/'>
   <button type="reset" onClick={(e)=>reset(e.preventDefault)} className='w-[50px] h-[50px] flex justify-center items-center bg-red-600 rounded-full cursor-pointer' >
     <MdOutlineClear className='text-2xl text-white transition-all ease-in-out hover:text-4xl'/> 
      </button>
  </Link>
 
      )
}

export default FormResetBtn
