"use client"
import React, { useState } from 'react'
import './Add.css';

export default function Add() {
    const [type, setType] = useState(null)
    const [contentType, setContentType] = useState("note")
    if(!type){
        return (
            <center>
                <div>
                    <h1 className='font-bold text-[#3269ff] text-2xl text-center mt-[50px]'>Select package for your note.</h1>
                    <p className='text-center font-sm text-gray-600'>Select package for your note Free / Premium</p>
                    <div className='flex justify-center gap-[25px] mt-[50px]'>
                        <div className='bg-[#ffffff] p-4 rounded-lg text-[#3269ff] min-w-[105px] font-semibold shadow-md hover:shadow-lg cursor-pointer' onClick={() => { setType("Free") }}>
                            <h1>Free</h1>
                        </div>
                        <div className='bg-[#ffffff] p-4 rounded-lg text-[#3269ff] min-w-[105px] font-semibold shadow-md hover:shadow-lg cursor-pointer' onClick={() => { setType("Pro") }}>
                            Premium
                        </div>
                    </div>
                </div>
            </center>
        )
    }

    if(type){
        return (
            <form className='m-[15px]'>
                <div className="space-y-12 ">
                    <div className="border-b border-gray-900/10 pb-12">
                    <h2 className=" font-bold text-2xl leading-7 text-gray-900 ">Add a note</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        FAfter adding note we will approve it.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Title of the note *
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                            
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Description for the note *
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="about"
                            name="about"
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            defaultValue={''}
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the note.</p>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload a cover photo (optional)
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                >
                                <span>Upload file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 1MB</p>
                            </div>
                        </div>
                        </div>

                        <div>
                        <p className="mt-3 text-sm leading-6 text-gray-600 w-[50vw]">Choose what you wan to go with.</p>
                        <div className='flex gap-[10px] w-[500px] mt-[10px]'>
                            <p
                                className={ contentType === "note" ? "activeBtnCato" : "notActiveBtnCato"}
                                onClick={() => {setContentType("note")}}
                                >
                                Write a note
                            </p>
                            <p
                                className={ contentType === "file" ? "activeBtnCato" : "notActiveBtnCato"}
                                onClick={() => {setContentType("file")}}

                                >
                                Upload a file
                            </p>
                        </div>
                        </div>

                        { contentType === "note" ? (
                            <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Description for the note *
                            </label>
                            <div className="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                            />
                            </div>
                        </div>
                        ) : (
                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Upload your file here
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                        >
                                        <span>Upload file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PDF, DOCX up to 2MB</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        { contentType !== "file" && (
                            <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            Upload a file (optional)
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                >
                                    <span>Upload file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PDF, DOCX up to 1MB</p>
                            </div>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>
                    
                </div>

                { type === "Pro" && (
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Set a price for the note ( 1$ - 50$ )
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                            
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                    </div>
                </div>
                )}

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => { setType(null) }}>
                    Cancel
                    </button>
                    <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                    Publish
                    </button>
                </div>
    </form>
        )
    }
}
