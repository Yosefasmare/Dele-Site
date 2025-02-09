'use client'

import Image from "next/image";
import React, { useState } from "react";
import { AiFillPicture } from "react-icons/ai";

export default function ImageUploader({ onImagesUploaded }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [images, setImages] = useState({ 1: null, 2: null, 3: null });
  const [imagePreviews, setImagePreviews] = useState({ 1: null, 2: null, 3: null });
  const [errors, setErrors] = useState({ 1: null, 2: null, 3: null });

  const handleImageUpload = (e, step) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, [step]: null }));

      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);

      const updatedImages = { ...images, [step]: file };
      const updatedPreviews = { ...imagePreviews, [step]: previewUrl };

      setImages(updatedImages);
      setImagePreviews(updatedPreviews);

      // Pass the updated images to the parent
      onImagesUploaded(updatedImages);

      setCurrentStep((prev) => (prev < 3 ? prev + 1 : prev)); // Go to the next step
    } else {
      setErrors((prev) => ({ ...prev, [step]: "Please upload a valid image file." }));
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Upload Property Images</h2>
      <div className="flex gap-3 justify-center items-center">

      {[1, 2, 3].map((step) => (
        <div key={step} className="mb-4">
          {imagePreviews[step] ? (
            <div className="mt-2">
              <Image
                src={imagePreviews[step]}
                alt={`Preview ${step}`}
                width={100}
                height={100}
                className="w-32 h-32 object-cover border border-gray-300 rounded"
              />
            </div>
          ) : (
            <div className={step > currentStep ? "hidden" : ""}>
               <label htmlFor="image" className="font-medium mb-2  flex justify-center items-center bg-gray-300 shadow-lg rounded-md w-[100px] h-[100px] cursor-pointer">
                      <AiFillPicture  className="text-4xl text-blue-500"/> - 
                      {step}
                  </label>
                   <input
                     type="file"
                     accept="image/*"
                     name="image"
                     id="image"
                     onChange={(e) => handleImageUpload(e, step)}
                     className="hidden w-full border border-gray-300 rounded-lg p-2"
                     hidden
                   />
              {errors[step] && <p className="text-red-500 text-sm">{errors[step]}</p>}
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
}





