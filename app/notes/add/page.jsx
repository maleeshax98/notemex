"use client";
import React, { useState, useRef } from "react";

import "./Add.css";
import {
  Stepper,
  Step,
  Button,
  Typography,
  CogIcon,
  Input,
  Textarea,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  UserIcon,
  BuildingLibraryIcon,
} from "@/Context/ThemeContext/ThemeContext";
import Image from "next/image";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/firebase/db";
import toast from "react-hot-toast";
import { Editor } from "@tinymce/tinymce-react";
import useAddNote from "@/hooks/useAddNote";
import CameraFeed from "./Components/CameraFeed/CameraFeed";

const data = [
  // {
  //   label: "Take Photos",
  //   value: "Takephotos",
  //   desc: `Take photos of your note. (max: 10)`,
  // },
  {
    label: "Upload Photos",
    value: "photos",
    desc: `Upload photos of your note. (max: 10)`,
  },
  {
    label: "Write Content",
    value: "text",
    desc: `Because it's about motivating the doers. Because I'm here
          to follow my dreams and inspire other people to follow their dreams, too.`,
  },
  {
    label: "Upload Files",
    value: "files",
    desc: `Upload pdf files maximum - 3`,
  },
];

const toastStyles = {
  style: {
    border: "1px solid #ff0000",
    backgroundColor: "#ff0000",
    padding: "16px",
    color: "#ffffff",
  },
};

export default function Add() {
  const [type, setType] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("<p></p>");
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [imgArr, setImgArr] = useState([]);
  const [filesArr, setFilesArr] = useState([]);
  const [price, setPrice] = useState("0");

  const [tagError, setTagError] = useState(null);
  const [newTag, setNewTag] = useState("");

  const [frontEndErrors, setFrontEndErros] = useState(null);
  const [uploading, setUploading] = useState(false);

  const tagField = useRef(null);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tags && tags.length <= 4) {
      setTagError(null);
      const tag = newTag.trim();
      if (tag && !tags.includes(tag)) {
        setTags((prev) => [...prev, tag]);
      }
    } else {
      setTagError("Maximum tag limit is 5");
    }
    setNewTag("");
    tagField.current.focus();
  };

  const handleRemoveTag = (tag) => {
    if (tags && tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    }
  };

  const handleImgChange = async (e) => {
    e.preventDefault();
    setUploading(true);
    const images = e.target.files;
    const imgLength = images.length;
    if (imgLength <= 0) {
      toast.error("Please select a picture.", toastStyles);
      setUploading(false);

      return;
    }
    if (imgLength > 10) {
      toast.error("Only 10 pictures can be uploaded", toastStyles);
      setUploading(false);

      return;
    }

    for (let i = 0; i < imgLength; i++) {
      if (!images[i].type.startsWith("image/")) {
        toast.error(
          "Please select an image file (JPEG, PNG, GIF, etc.).",
          toastStyles
        );
        setUploading(false);

        return;
      }
      const maxFileSize = 2 * 1024 * 1024;
      if (images[i].size > maxFileSize) {
        toast.error(
          "Please select an image file (JPEG, PNG, GIF, etc.) with a size less than 2MB.",
          toastStyles
        );
        setUploading(false);

        return;
      }

      const storageRef = ref(storage, "images/" + images[i].name);
      const uploadTask = uploadBytesResumable(storageRef, images[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const tempArr = imgArr;
            console.log("imgarr", imgArr);
            tempArr.push(downloadURL);
            setImgArr(tempArr);
            toast.success(`Image ${i + 1} uploaded.`);
            setUploading(false);
          });
        }
      );
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setUploading(true);

    const pdfs = e.target.files;
    const pdfslength = pdfs.length;
    if (pdfslength <= 0) {
      toast.error("Please select a PDF.", toastStyles);
      setUploading(false);

      return;
    }
    if (pdfslength > 3) {
      toast.error("Only 3 PDFs can be uploaded", toastStyles);
      setUploading(false);

      return;
    }
    for (let i = 0; i < pdfslength; i++) {
      if (pdfs[i].type !== "application/pdf") {
        toast.error(
          "Please select an adPDF file (JPEG, PNG, GIF, etc.) with a size less than 2MB.",
          toastStyles
        );
        setUploading(false);

        return;
      }
      const maxFileSize = 2 * 1024 * 1024;

      if (pdfs[i].size > maxFileSize) {
        toast.error(
          "Please select an 2PDF file (JPEG, PNG, GIF, etc.) with a size less than 2MB.",
          toastStyles
        );
        setUploading(false);

        return;
      }

      const storageRef = ref(storage, "upload/" + pdfs[i].name);
      const uploadTask = uploadBytesResumable(storageRef, pdfs[i]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            const tempArr = filesArr;
            console.log("imgarr", filesArr);
            tempArr.push(downloadURL);
            setFilesArr(tempArr);
            setUploading(false);

            toast.success(`File ${i + 1} uploaded.`);
          });
        }
      );
    }
  };

  const { loading, add } = useAddNote();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !title.trim()) {
      toast.error("Please Add A Title", toastStyles);
      setActiveStep(0);
      return;
    }

    if (!desc || !desc.trim()) {
      toast.error("Please Add A Description", toastStyles);
      setActiveStep(0);
      return;
    }

    if (!content.trim() && imgArr.length === 0 && filesArr.length === 0) {
      toast.error(
        "Please write a note / upload images / upload pdf ",
        toastStyles
      );
      setActiveStep(1);
      return;
    }

    if ((type === "Pro" && !price) || !price.trim()) {
      toast.error("Please set a price min:- 1$ max:- 50$ ", toastStyles);
      setActiveStep(3);
      return;
    }

    let intPrice = 0;

    if (type === "Pro") {
      intPrice = parseInt(price, 10);
    }

    if (isNaN(intPrice)) {
      toast.error("Please set a valid price ", toastStyles);
      setActiveStep(3);
      return;
    }

    await add(title, content, imgArr, tags, filesArr, desc, type, intPrice);
  };

  if (!type) {
    return (
      <center>
        <div>
          <h1 className="font-bold text-[#3269ff] text-2xl text-center mt-[50px]">
            Select package for your note.
          </h1>
          <p className="text-center font-sm text-gray-600">
            Select package for your note Free / Premium
          </p>
          <div className="flex justify-center gap-[25px] mt-[50px]">
            <div
              className="bg-[#ffffff] p-4 rounded-lg text-[#3269ff] min-w-[105px] font-semibold shadow-md hover:shadow-lg cursor-pointer"
              onClick={() => {
                setType("Free");
              }}
            >
              <h1>Free</h1>
            </div>
            <div
              className="bg-[#ffffff] p-4 rounded-lg text-[#3269ff] min-w-[105px] font-semibold shadow-md hover:shadow-lg cursor-pointer"
              // onClick={() => {
              //   setType("Pro");
              // }}
            >
              Premium (BETA)
            </div>
          </div>
        </div>
      </center>
    );
  }

  if (type) {
    return (
      <form
        className="m-[15px]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-full px-24 py-4 text-[#3269ff]">
          <div className="hidden md:block">
            <Stepper
              activeStep={activeStep}
              isLastStep={(value) => setIsLastStep(value)}
              isFirstStep={(value) => setIsFirstStep(value)}
            >
              <Step onClick={() => setActiveStep(0)} className="bg-[#3269ff]">
                1
              </Step>
              <Step onClick={() => setActiveStep(1)}>2</Step>
              <Step onClick={() => setActiveStep(2)} disabled={true}>
                3
              </Step>
              {type === "Pro" ? (
                <Step onClick={() => setActiveStep(3)} disabled={true}>
                  4
                </Step>
              ) : (
                <></>
              )}
            </Stepper>
          </div>
        </div>

        <div>
          {activeStep === 0 && (
            <div className=" p-4 ">
              <div>
                <p className="font-semibold text-sm  text-gray-600">
                  Title of the note
                </p>
                <div className="mt-[10px]">
                  <Input
                    label="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
              </div>
              <div className="mt-[25px]">
                <p className="font-semibold text-sm  text-gray-600">
                  Description for note
                </p>
                <div className="mt-[10px]">
                  <Textarea
                    size="lg"
                    label="Description"
                    onChange={(e) => setDesc(e.target.value)}
                    value={desc}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {activeStep === 2 && (
            <div className=" p-4 ">
              <div>
                <p className="font-semibold text-sm  text-gray-600">
                  Add search tags ( you can skip )
                </p>

                <div className=" p-[10px] rounded-md align-middle">
                  <div className="flex flex-wrap ">
                    {tags &&
                      tags.map((tag, index) => (
                        <p
                          className="p-[10px] flex gap-[10px]  mt-[10px] mb-[10px] bg-gray-200 text-black font-semiBold mr-2 rounded-md"
                          key={index}
                        >
                          <span>
                            <Image
                              src={"/icons/new/close.svg"}
                              alt="close"
                              width={20}
                              height={20}
                              onClick={() => {
                                handleRemoveTag(tag);
                              }}
                              className="mr-[5px]"
                            />
                          </span>
                          <span>{tag}</span>
                        </p>
                      ))}
                  </div>
                  <div className="flex flex-wrap mt-[10px]  mb-[10px]">
                    <div>
                      {tagError && <p className="text-red-600">{tagError}</p>}
                      <input
                        className={`${
                          tagError ? "border-red-600" : ""
                        } p-[5px] outline-none border-2 rounded-md`}
                        type="text"
                        onChange={(e) => setNewTag(e.target.value)}
                        value={newTag}
                        ref={tagField}
                      />
                      <button
                        className="rounded-lg px-4 py-2 text-white bg-black ml-[5px]"
                        onClick={handleAddTag}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          {activeStep === 1 && (
            <div>
              <Tabs value="photos">
                <TabsHeader>
                  {data.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                <TabsBody>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {value === "Takephotos" && (
                        <div>
                          {/* <CameraFeed imgArr={imgArr} setImgArr={setImgArr} /> */}
                        </div>
                      )}
                      {value === "photos" ? (
                        <div>
                          <div className="col-span-full">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Upload photos
                            </label>
                            <p className="text-xs text-gray-500">{desc}</p>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <label
                                    htmlFor="img-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload photos</span>
                                    <input
                                      id="img-upload"
                                      name="img-upload"
                                      accept="image/*"
                                      multiple
                                      onChange={handleImgChange}
                                      type="file"
                                      className="sr-only"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                  PNG, JPG, GIF up to 1MB
                                </p>
                              </div>
                            </div>
                            <div className="flex mt-[10px] overflow-x-auto gap-[10px] w-[100%]">
                              {imgArr.map((img) => (
                                <div
                                  className=" min-w-[250px] h-[250px] overflow-hidden relative"
                                  key={img}
                                >
                                  <Image
                                    src={"/icons/new/close.svg"}
                                    width={50}
                                    height={50}
                                    className=" absolute top-0 left-0 z-10"
                                    alt="f"
                                  />
                                  <Image
                                    src={img}
                                    fill
                                    className="object-cover w-full h-full rounded-lg"
                                    alt="f"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : value === "text" ? (
                        <div>
                          <Editor
                            apiKey="3o4jcylksnmtzq2q8m16zd0iyh1r4fxnddjkeowjmkjivwat"
                            onEditorChange={(newValue, editer) => {
                              setContent(newValue);
                              setText(editer.getContent({ format: "text" }));
                            }}
                            value={content}
                            init={{
                              plugins: "",
                              toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                              tinycomments_mode: "embedded",
                              tinycomments_author: "Author name",
                              mergetags_list: [
                                { value: "First.Name", title: "First Name" },
                                { value: "Email", title: "Email" },
                              ],
                              ai_request: (request, respondWith) =>
                                respondWith.string(() =>
                                  Promise.reject(
                                    "See docs to implement AI Assistant"
                                  )
                                ),
                            }}
                          />
                        </div>
                      ) : value === "files" ? (
                        <div>
                          <div className="col-span-full">
                            <label
                              htmlFor="cover-photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Upload files
                            </label>
                            <p className="text-xs text-gray-500">{desc}</p>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                              <div className="text-center">
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                  >
                                    <span>Upload Pdf</span>
                                    <input
                                      id="file-upload"
                                      name="file-upload"
                                      type="file"
                                      className="sr-only"
                                      multiple
                                      accept=".pdf"
                                      onChange={handleFileUpload}
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop </p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">
                                  PDF up to 2MB
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </div>
          )}
        </div>
        <div>
          {activeStep === 3 && type === "Pro" && (
            <div className=" p-4 ">
              <div>
                <p className="font-semibold text-sm  text-gray-600">
                  Set Price{" "}
                </p>

                <div className=" p-[10px] rounded-md align-middle">
                  <div className="flex flex-wrap mt-[10px]  mb-[10px]">
                    <div>
                      <input
                        className={` p-[5px] outline-none border-2 rounded-md`}
                        type="text"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-30 flex justify-between">
          <Button
            onClick={handlePrev}
            disabled={isFirstStep || uploading}
            className="bg-[#3269ff]"
          >
            Prev
          </Button>
          {(activeStep === 2 && type !== "Pro") || activeStep === 3 ? (
            <div>
              {uploading || loading ? (
                <div>
                  <Button
                    disabled={true}
                    className="bg-[#3269ff] flex items-center"
                  >
                    <span>
                      <Image
                        src={"/icons/new/loading.svg"}
                        alt="loading"
                        className="animate-spin"
                        width={40}
                        height={30}
                      />{" "}
                    </span>
                    Processing...
                  </Button>
                </div>
              ) : (
                <div>
                  {tags.length <= 0 && type !== "Pro" ? (
                    <Button onClick={handleSubmit} className="bg-[#3269ff]">
                      Skip & Add
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-[#3269ff]">
                      Add
                    </Button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {uploading || loading ? (
                <div>
                  <Button
                    disabled={true}
                    className="bg-[#3269ff] flex items-center"
                  >
                    <span>
                      <Image
                        src={"/icons/new/loading.svg"}
                        alt="loading"
                        className="animate-spin"
                        width={40}
                        height={30}
                      />{" "}
                    </span>
                    Processing...
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={isLastStep}
                  className="bg-[#3269ff]"
                >
                  Next
                </Button>
              )}
            </div>
          )}
        </div>
      </form>
    );
  }
}
