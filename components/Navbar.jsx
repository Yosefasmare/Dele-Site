"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import SignUp from "./SignUp"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout, selectUser } from "@/lib/slices/userSlice"
import { auth } from "@/lib/firebase"
import Image from "next/image"
import { FaPlus } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineClear } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { fetchAgentFun } from "@/lib/requests"
import ProfileLoader from "./ProfileLoader"


const Navbar = ()  => {

  const user = useSelector(selectUser)
  const [openMenu, setOpenMenu] = useState(false)
  const pathName = usePathname()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(false)

  const [isMounted, setIsMounted] = useState(false);


  const navLinks = [
    {name: 'home' , href : "/"},
    {name: 'Properties' , href : "/properties"},
    {name: 'About Us' , href : "/about"},
  ]

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    setIsMounted(true);
    const unsub = auth.onAuthStateChanged((userAuth)=>{
        if(userAuth){
         dispatch(login({
            uid:userAuth.uid,
         }))
        }
        else{
          dispatch(logout())
        }
      })
      return unsub;
  },[])
  useEffect(()=>{
    setLoading(true)
 
    const fetchAgent = async () => {
      try {
        const loggedAgent = await fetchAgentFun({id:user?.uid})
          setAgent(loggedAgent)
      } catch (error) {
        console.log(error,'fdf')
      } finally{
        setLoading(false)
      }
    }
    
    if(user?.uid !== null && user?.uid !== '' && user?.uid !== undefined){
          fetchAgent()
    }

  },[user?.uid])
  if (!isMounted) return null;

 
  
  return (
    <>
    <header className={`${pathName === '/dashboard' && 'hidden'} w-full p-5 h-[70px] flex fixed z-50 bg-white  drop-shadow-xl`}>
      <div className='flex-1 pl-5  flex-col justify-center  items-center'>
          <span className=' capitalize font-bold text-2xl lg:text-3xl text-[#734b33]'>dele-site</span>
      </div>
      <div className="lg:flex gap-5 items-center hidden ">
        <ul className="flex gap-5 h-full  font-serif font-semibold ">
       {navLinks.map(navLink=>{ 
            const isActive =
            navLink.href === '/'
              ? pathName === '/'
              : pathName.startsWith(navLink.href);
      
        return(
        <Link key={navLink.href} href={navLink.href}><li  className={`pl-4 pr-4 p-2 rounded-lg mb-2 cursor-pointer hover:border-b-2 transition-all ease-in-out hover:font-extrabold hover:shadow-navShadow hover:rotate-[15deg] hover:-translate-y-2 capitalize ${isActive && 'rotate-[15deg] font-extrabold shadow-navShadow -translate-y-2'} `}>{navLink.name}</li></Link> 
       )})}
        </ul>
        {user ? (
          <div className="flex gap-3">
               <Link href={`/dashboard/${user?.uid}/listings/add-property`}><button className="p-2 pl-5 pr-5 flex gap-1 bg-gray-900 text-white border-2 border-gray-900 capitalize rounded-md font-bold font-serif hover:bg-white hover:text-gray-900"><FaPlus />  add listing</button></Link>
               {loading ? <ProfileLoader width={'w-[45px]'} height={'h-[45px]'} /> : 
               <Link href={`/dashboard/${user?.uid}`} className="flex justify-center items-center gap-2"> 
               {agent?.profilePic  ? 
                      <Image src={agent?.profilePic} width={400} height={400} alt="profile pic"  className="w-[45px] h-[45px] rounded-full object-cover border border-gray-600"/>
                : 
                      <FaUserTie className=" border-2 border-black rounded-full text-4xl" />
                 } 
                 </Link>
            }
          </div>
        ):(
              <button onClick={()=>setIsLoginOpen(prev=>!prev)} className="p-2 pl-7 pr-7  capitalize text-black bg-white border-2 font-bold  rounded-md border-black transition-all ease-in-out hover:bg-black hover:text-white">become an agent </button>
        )}
        
     
      </div>
       <div className="lg:hidden flex p-3 justify-end items-center gap-3">{openMenu ? <MdOutlineClear  size={30} onClick={()=>setOpenMenu(prev=>!prev)}/> : <RiMenu3Fill  size={30} onClick={()=>setOpenMenu(prev=>!prev)}/> }
        {user &&
         <div>
          {loading ? <ProfileLoader width={'w-[45px]'} height={'h-[45px]'} /> : 
             <Link href={`/dashboard/${user?.uid}`} className="flex justify-center items-center gap-2">
             {agent?.profilePic !== null && agent?.profilePic !== '' ?
                    <Image src={agent?.profilePic} width={400} height={400} alt="profile pic"  className="w-[45px] h-[45px] rounded-full object-cover"/>
               : 
                    <FaUserTie className=" border-2 border-black rounded-full text-4xl" /> 
              }
                </Link>
          }
            </div>
          }
       </div>
    </header>
    <nav className={`flex flex-col w-full justify-end items-center pb-3 transition ease-in-out duration-150 h-[340px] ${openMenu ? ' translate-y-0' : ' translate-y-[-400px]'}  z-[45] bg-white border-b-2 border-black fixed`}>
    <ul className="flex gap-5 p-2 w-full flex-col justify-center items-center  font-serif font-semibold ">
       {navLinks.map(navLink=>{ 
            const isActive =
            navLink.href === '/'
              ? pathName === '/'
              : pathName.startsWith(navLink.href);
      
        return(
        <Link key={navLink.href} href={navLink.href} ><li  className={`pl-4 pr-4 p-2 rounded-lg mb-2 cursor-pointer hover:border-b-2 transition-all ease-in-out hover:font-extrabold hover:shadow-navShadow hover:rotate-[15deg] hover:-translate-y-2 capitalize ${isActive && 'rotate-[15deg] font-extrabold shadow-navShadow -translate-y-2'} `}>{navLink.name}</li></Link> 
       )})}
        </ul>
        {user ? (
          <div className="flex  gap-3">
               <Link href={`/dashboard/add-property`} ><button className="p-2 pl-5 pr-5 flex gap-2 bg-gray-900 text-white border-2 border-gray-900 capitalize rounded-md font-bold font-serif justify-center items-center  hover:bg-white hover:text-gray-900"><FaPlus />  add listing</button></Link>
          </div>
        ):(
              <button onClick={()=>setIsLoginOpen(prev=>!prev)} className="p-2 pl-7 pr-7  capitalize text-black bg-white border-2 font-bold  rounded-md border-black transition-all ease-in-out hover:bg-black hover:text-white">become an agent </button>
        )}
    </nav>
    {isLoginOpen && !user  &&  <SignUp  setIsLoginOpen={setIsLoginOpen}/>}
    
     </>
  )
}

export default Navbar
