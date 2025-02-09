'use client'

import { databases, ID, storage } from "@/lib/appwrite";
import Image from "next/image";
import React, { useState } from "react";

function UploadImage({agentPic,id}) {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null)
  const [loading,setLoading] = useState('')
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      // Create a URL to preview the image
      const url = URL.createObjectURL(file);
      setImagePreview(url) 
      setFile(file)
    }
  };


  const handleClear = () => {
     setFile(null)
     setImagePreview(null)
  }
  const handleSelect  = async () => {
    if (!file) {
        alert("Please select a file first!");
        return;
      }
  try {
      setLoading(true)
      const response = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
        ID.unique(),
        file
    )

    const fileId = response.$id;
    const fileUrl = storage.getFileView(
      process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, 
      fileId
    );

    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATASETS_ID,
        process.env.NEXT_PUBLIC_APPWRITE_AGENT_COLLECTION_ID,
        id,
        {profilePic: fileUrl}
    )
    
    setTimeout(()=>window.location.reload(),2000)
    

    
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Failed to upload the file.");
  } finally {
    setLoading(false)
    setFile(null)
    setImagePreview(null)
  }

  }

  return (
    <div className="relative">
      <label htmlFor="uploadimage" className=" capitalize border-2 border-black rounded-md font-bold px-6 py-3 text-white bg-black cursor-pointer transition-all ease-in-out hover:bg-white hover:text-black">{agentPic ? 'change picture' :  'Upload a picture'}</label>
      <input
        type="file"
        accept="image/*" // Ensures only image files can be selected
        id="uploadimage"
        name="uploadimage"
        onChange={handleImageUpload}
        hidden
      />
      {imagePreview && (
        <div className="flex flex-col z-10 fixed justify-center items-center gap-6 top-3 bg-black/70 backdrop-blur-md border border-white/20 rounded-lg shadow-lg w-[95%] lg:left-[400px] lg:w-[650px] h-[80%] left-3 ">
          <h3 className="font-extrabold text-white text-2xl">Image Preview</h3>
          <div className="flex justify-center items-center w-[270px] h-[270px] overflow-hidden object-cover rounded-full ">
          <Image src={imagePreview} alt="Uploaded Preview" width={500} height={500} className=" w-full h-full object-cover " />
          </div>
          <div className="flex justify-center gap-7 items-center">
            <button onClick={handleClear} className="px-9 py-3 rounded-md text-xl bg-red-500 text-white font-bold transition-all ease-in-out hover:text-2xl">clear</button>
            <button onClick={handleSelect} className="px-9 py-3 rounded-md text-xl bg-green-500 text-white font-bold transition-all ease-in-out hover:text-2xl">{ loading ? 'selecting...' : 'select'}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadImage;
