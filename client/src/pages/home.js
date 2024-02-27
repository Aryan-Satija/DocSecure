import React from 'react'
import {MdVerifiedUser} from 'react-icons/md'
import document from '../assets/document.jpg'
import banner from '../assets/bannerAbout.mp4'
export const Home = () => {
  return (
    <div className='py-24 px-4'>
        <div className='flex flex-col gap-8'>
            <div className='text-2xl flex items-center text-slate-950'>Welcome To DocSecure <span className='text-4xl text-green-400'><MdVerifiedUser/></span></div>
            <div>
                <video
                        muted
                        loop
                        autoPlay className="w-[100%] mx-auto">
                        <source src={banner}></source>
                </video>
            </div>
            <div className='flex flex-col md:flex-row-reverse items-center justify-between'>
                <div className='flex items-center'>
                    <img className='w-[60rem]' src={document}/>
                </div>
                <div className='text-lg text-slate-700 flex flex-col gap-4'>
                    <div>
                        DocSecure is a powerful tool that allows you to upload and validate PDF documents securely against entries in the blockchain. 
                    </div>
                    <div>
                        Whether you're a professional dealing with sensitive contracts, a student submitting important research papers, or anyone in between, our platform ensures the integrity and authenticity of your documents.
                    </div>
                    <div>
                        DocSecure streamlines the document validation process, saving you time and providing peace of mind. 
                    </div>
                    <div>
                    Get started today by uploading your first document and experience the difference!
                    </div>
                </div>
            </div>
            <div className='text-slate-700 text-lg grid grid-cols-3'>
                <div className='border h-[14rem] bg-slate-200 flex flex-col px-16 justify-center'>
                    Upload PDF documents with ease.
                </div>
                <div className='border h-[14rem] bg-slate-400 flex flex-col px-16 justify-center'>
                    Validate document authenticity using blockchain technology.
                </div>
                <div className='border h-[14rem] bg-slate-200 flex flex-col px-16 justify-center'>
                    User-friendly interface for seamless navigation.
                </div>
                <div className='border h-[14rem] bg-slate-400 flex flex-col px-16 justify-center'>
                    Secure and private document handling.
                </div>
                <div className='border h-[14rem] bg-slate-200 flex flex-col px-16 justify-center'>
                    Fast and reliable performance.
                </div>
            </div>
            
        </div>
    </div>
  )
}
