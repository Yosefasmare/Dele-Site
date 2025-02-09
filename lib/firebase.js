
import { getApp, getApps, initializeApp } from "firebase/app";
import {FacebookAuthProvider, getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB-9dw4_a5PguOVjglwosoO56oYX5ZEDGQ",
  authDomain: "dele-site-f068c.firebaseapp.com",
  projectId: "dele-site-f068c",
  storageBucket: "dele-site-f068c.firebasestorage.app",
  messagingSenderId: "230293169070",
  appId: "1:230293169070:web:398eef6aef480dbed7de3f"
};

const app = getApps().length === 0 ?   initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

//  auth.onAuthStateChanged((userAuth)=>{
//   const fetchAgent = async () => {
//     const existingAgent = await client.fetch(AGENT_IN_SANITY, {id: userAuth?.uid})
//     if(!existingAgent){
//       await writeAgent.create(
//        { _type: 'agent',
//         id: userAuth?.uid,
//         userName: userAuth?.displayName,
//         email: userAuth?.email,
//         image: userAuth?.photoURL
//       }
//       )
//     }
//     return true
//   }

//   fetchAgent()
// })

export { auth, googleProvider, facebookProvider }
