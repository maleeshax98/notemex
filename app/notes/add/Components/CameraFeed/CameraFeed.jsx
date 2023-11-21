"use client";
import React, { useRef } from "react";
import Webcam from "react-webcam";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  uploadString
} from "firebase/storage";
import { storage } from "@/firebase/db";

export default function CameraFeed({ imgArr, setImgArr }) {
  const webcamRef = useRef(null);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Upload the image to Firebase Storage
    const storageRef = ref(storage, `takedPhotos/${Date.now()}.jpg`);
    await uploadString(storageRef, imageSrc, "data_url");

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);
    console.log(downloadUrl)
    // Update the state with the new URL
    setImgArr((prevUrls) => [...prevUrls, downloadUrl]);
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="relative w-full h-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
          />
          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              capture();
            }}
          >
            Capture and Upload
          </button>
        </div>
      </div>
    </div>
  );
}
