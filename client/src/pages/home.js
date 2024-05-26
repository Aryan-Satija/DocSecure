import React from 'react'

import Footer from '../components/footer';
import hero from '../assets/hero.png'
import { useNavigate } from 'react-router-dom';

const companies = [
    {
        id: 1,
        name: 'Google',
    },
    {
        id: 2,
        name: 'Facebook',
    },
    {
        id: 3,
        name: 'Shopify'
    },
    {
        id: 4,
        name: 'Amazon',
    },
    {
        id: 5,
        name: 'Scale',
    },
    {
        id: 6,
        name: 'Webflow',
    },
    {
        id: 7,
        name: 'Threads',
    },
    {
        id: 8,
        name: 'Twitter',
    },
    {
        id: 9,
        name: 'Neon'
    },
]

export const Home = () => {
    const navigate = useNavigate();
    return (
    <div className='py-24 px-4 overflow-x-hidden'>
        <div className='w-[60%] min-w-[320px] mx-auto flex flex-col gap-8'>
            <h1 className='text-4xl font-bold text-slate-200 text-center'>Welcome to DocSecure</h1>
            <div className='text-md text-slate-400 text-center'>
                DocSecure is a powerful tool that allows you to upload and validate PDF documents securely against entries in the blockchain. 
            </div>
            <button onClick={()=>{
                navigate('/signup')
            }} className='text-slate-100 bg-sky-600 p-2 w-[8rem] mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center'>
                Visit Now
            </button>
            <div className='bg-black p-16 lg:p-4 flex flex-col-reverse lg:flex-row items-center gap-4 rounded-md '>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-slate-200 text-4xl font-semibold text-center'>Transparency & authenticity</h2>
                    <p className='text-sm text-slate-400 text-center'>Whether you're a professional dealing with sensitive contracts, a student submitting important research papers, or anyone in between, our platform ensures the integrity and authenticity of your documents</p>
                </div>
                <>
                    <img src={hero} width={300} className='rounded-md'/>
                </>
            </div>
            <div className='bg-black p-16 lg:p-4 flex flex-col lg:flex-row items-center gap-4 rounded-md '>
                <>
                    <img src={hero} width={300} className='rounded-md'/>
                </>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-slate-200 text-4xl font-semibold text-center'>Peace of mind</h2>
                    <p className='text-sm text-slate-400 text-center'>DocSecure streamlines the document validation process, saving you time and providing peace of mind.</p>
                </div>
            </div>
            <div className='bg-black p-16 lg:p-4 flex flex-col-reverse lg:flex-row items-center gap-4 rounded-md '>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-slate-200 text-4xl font-semibold text-center'>Trust and Reliability</h2>
                    <p className='text-sm text-slate-400 text-center'>At DocSecure, we understand the paramount importance of trust and reliability when it comes to document integrity. Our mission is to empower individuals and organizations alike by offering a seamless platform that simplifies the document validation process while ensuring the highest standards of security.</p>
                </div>
                <>
                    <img src={hero} width={300} className='rounded-md'/>
                </>
            </div>
            <div className='bg-black p-16 lg:p-4 flex flex-col lg:flex-row items-center gap-4 rounded-md '>
                <>
                    <img src={hero} width={300} className='rounded-md'/>
                </>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <h2 className='text-slate-200 text-4xl font-semibold text-center'>Experience the Difference</h2>
                    <p className='text-sm text-slate-400 text-center'>Get started today by uploading your first document and experience the difference!</p>
                </div>
            </div>
            <div>
                <h2 className='text-2xl text-center mt-4 text-slate-400 font-semibold'>Companies Using DocSecure</h2>
                <div className='flex flex-wrap gap-4 items-center justify-center mt-4 text-slate-100'>
                {
                    companies.map((company)=>{
                        return <div key={company.id} className='w-[220px] p-4 rounded-lg bg-black text-2xl  flex flex-col items-center justify-center aspect-video cursor-pointer hover:scale-105 duration-200 shadow-md shadow-slate-800'>
                            <div className='bg-gradient-to-r from-slate-400 to-slate-200 inline-block text-transparent bg-clip-text'>
                                {company.name}
                            </div>
                        </div>
                    })
                }
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
