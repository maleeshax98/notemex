import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage } from "@/firebase/db";

import toast from "react-hot-toast";
// Import your Firebase storage library here
const toastStyles = {
  style: {
    border: "1px solid #ff0000",
    backgroundColor: "#ff0000",
    padding: "16px",
    color: "#ffffff",
  },
};
const useDpUpload = (toastStyles) => {
  const [uploading, setUploading] = useState(false);
  const [imgURL, setImgURL] = useState(null);

  const handleImgChange = async (e, folder) => {
    e.preventDefault();
    setUploading(true);
    const image = e.target.files[0];

    if (!image) {
      toast.error("Please select a picture.", toastStyles);
      setUploading(false);
      return;
    }

    if (!image.type.startsWith("image/")) {
      toast.error(
        "Please select an image file (JPEG, PNG, GIF, etc.).",
        toastStyles
      );
      setUploading(false);
      return;
    }

    const maxFileSize = 2 * 1024 * 1024;
    if (image.size > maxFileSize) {
      toast.error(
        "Please select an image file with a size less than 2MB.",
        toastStyles
      );
      setUploading(false);
      return;
    }

    const storageRef = ref(storage, `dps/` + image.name);
    const uploadTask = uploadBytesResumable(storageRef, image);

    try {
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      setImgURL(downloadURL);
      toast.success("Image uploaded.");
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setUploading(false);
  };

  return { uploading, imgURL, handleImgChange };
};

export default useDpUpload;
