// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "./firebase";
// import { client, writeAgent } from "@/sanity/lib/client";
// import { AGENT_IN_SANITY } from "@/sanity/lib/query";


// export  const handelGoogleAuth = async () =>{
//     const reselt = await signInWithPopup(auth,googleProvider).catch((error)=>alert(error))
//     const user = reselt.user
   
 
//      const userData = {
//        id: user.uid,
//        username: user.displayName,
//        email: user.email,
//        image: user.photoURL,
//      };
 
//    const existingAgent = await client.fetch(AGENT_IN_SANITY, {id: user.uid})
     
//    if(existingAgent){
//        return existingAgent;
//    }else{
//      const newAgent = await writeAgent.create({
//        _id: `agent-${user.uid}`, // Use Firebase UID as a unique identifier
//        _type: 'agent',
//        ...userData,
//      });
 
//     return newAgent
//    }
 
//    }