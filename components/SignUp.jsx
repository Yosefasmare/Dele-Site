"use client";

import { auth, googleProvider } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { GoXCircleFill } from "react-icons/go";
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { databases, ID } from '@/lib/appwrite';

const SignUp = ({ setIsLoginOpen }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const [isPassowordShown, setIsPasswordShown] = useState(false)
  const [isconfPassowordShown, setIsconfPasswordShown] = useState(false)

  const handleGoogleSignup = async () => {
    try {
    const userCredential =  await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;
     
    await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
      process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
      ID.unique(),
      {
        agentName: user.displayName || user.email,
        agentPhoneNumber: null,
        agentEmail: user.email,
        id: user.uid,
        profilePic: user.photoURL || null,
        bio: '',
        company: ''
     }
   );

    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // ✅ Fix preventDefault issue

    if (password !== confPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) { // ✅ Fix password length check
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     await databases.createDocument(
         process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
         process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
         ID.unique(),
         {
           agentName: name,
           agentPhoneNumber: null,
           agentEmail: user.email,
           id: user.uid,
           profilePic: user.photoURL || null,
           password , 
           bio: '',
           company: ''
        }
      );
     
      setError('');
    } catch (error) {
     
      setError("Signup failed. Please try again.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
       await signInWithEmailAndPassword(auth, email, password);



      setError('');
    } catch (error) {
      console.error(error);
      setError("Login failed. Please check your credentials.");
    }
  };


  return (
    <section className="fixed z-50 w-full h-[100vh] flex justify-center pt-12 bg-[#000000b3]">
      <div className="w-[400px] h-[540px] bg-white rounded-md p-5 flex flex-col overflow-hidden overflow-y-scroll">
        <div className="w-full h-full">
          <div className="flex justify-between items-center border-b-2 border-gray-400">
            <h1 className="font-extrabold text-2xl capitalize">Welcome, Agent</h1>
            <GoXCircleFill className="cursor-pointer" onClick={() => setIsLoginOpen(prev => !prev)} />
          </div>
          <div className="flex flex-col py-5 gap-1">
            <form className="w-full flex flex-col">
              {isSignUp && (
                <>
              <label htmlFor="name" className="font-bold text-xl capitalize">Agent Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="p-2 border-2 border-gray-600 rounded-md outline-none"
                placeholder="eg. agent"
                onChange={(e) => setName(e.target.value)}
                required
              />
                </>
              )}
              <label htmlFor="email" className="font-bold text-xl capitalize">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="p-2 border-2 border-gray-600 rounded-md outline-none"
                placeholder="eg. agent1@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <label htmlFor="password" className="font-bold text-xl capitalize">Password</label>
              <div className='border-2 border-gray-600 rounded-md flex'>
                  <input
                    type={`${isPassowordShown ? 'text' : 'password'}`}
                    id="password"
                    name="password"
                    className="p-2 w-[90%]  outline-none"
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className='flex justify-center items-center'>
                  {isPassowordShown ? <FaRegEyeSlash cursor={'pointer'} onClick={()=>setIsPasswordShown(prev=>!prev)} /> : <FaRegEye cursor={'pointer'}  onClick={()=>setIsPasswordShown(prev=>!prev)} />}
                   </div>
                </div>
              {isSignUp && (
                <>
                  <label htmlFor="confpassword" className="font-bold text-xl capitalize">Confirm Password</label>
                  <div className='border-2 border-gray-600 rounded-md flex'>
                  <input
                    type={`${isconfPassowordShown ? 'text' : 'password'}`}
                    id="confpassword"
                    name="confpassword"
                    className="p-2 w-[90%]  outline-none"
                    placeholder="********"
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                  />
                  <div className='flex justify-center items-center'>
                  {isconfPassowordShown ? <FaRegEyeSlash cursor={'pointer'} onClick={()=>setIsconfPasswordShown(prev=>!prev)} /> : <FaRegEye cursor={'pointer'}  onClick={()=>setIsconfPasswordShown(prev=>!prev)} />}
                   </div>
                  </div>
                </>
              )}
              {error && <span className="font-semibold text-red-700">{error}</span>}
              {isSignUp ? (
                <button onClick={handleSignup} className="mt-3 p-3 hover:bg-gray-900 hover:text-white rounded-md cursor-pointer font-bold border-2 border-gray-900 transition ease-in-out bg-yellow-100 text-gray-900">
                  Sign Up
                </button>
              ) : (
                <button onClick={handleLogin} className="mt-3 p-3 bg-gray-900 text-white rounded-md cursor-pointer font-bold border-2 border-gray-900 transition ease-in-out hover:bg-white hover:text-gray-900">
                  Login
                </button>
              )}
            </form>
            <span className="capitalize font-semibold text-center">
              {isSignUp ? "Already have an account?" : "New to Dele-Site?"}
              <button className="text-blue-700 border-b-2 border-blue-700" onClick={() => setIsSignUp(prev => !prev)}>
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </span>
          </div>
          <span className="flex font-bold justify-center items-center">or</span>
          <div className="w-full p-4 flex flex-col justify-center items-center pt-5 gap-3">
            <button onClick={handleGoogleSignup} className="p-2 pl-10 pr-10 rounded-lg border-2 border-gray-900 flex gap-2 justify-around items-center font-bold text-gray-900 bg-white hover:text-white hover:bg-gray-900 transition-all ease-in-out">
              <FcGoogle size={30} /> Continue with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
