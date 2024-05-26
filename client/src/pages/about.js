import React from 'react'
import diagram from '../assets/diagram.png'
import hero from '../assets/about.png'
import Footer from '../components/footer';
export const About = () => {
  return (
    <div className='py-24 px-4'>
        <div className='flex flex-col gap-8'>
            <div className=''>
                <img 
                    src={hero}
                    className='w-full aspect-video'
                />
            </div>
            <div className='w-[60%] min-w-[320px] mx-auto flex flex-col items-center justify-center gap-4'>
                <div className='text-4xl text-center font-bold text-slate-100'>Our Mission</div>
                <div className='text-slate-400 font-md text-center'>
                    DocSecure offers a cutting-edge solution designed to uphold the integrity and authenticity of your PDF documents through secure validation against entries in the blockchain
                    Whether you're a seasoned professional managing sensitive contracts, a diligent student submitting crucial research papers, or anyone in between, DocSecure provides the assurance and peace of mind you need.
                    At DocSecure, we understand the paramount importance of trust and reliability when it comes to document integrity. Our mission is to empower individuals and organizations alike by offering a seamless platform that simplifies the document validation process while ensuring the highest standards of security.
                </div>
                <div className='text-4xl text-center font-bold text-slate-100'>
                    How It Works?
                </div>
                <div className='text-slate-400 font-md text-center'>
                    Upload: Simply upload your PDF document to the DocSecure platform. <br/>
                    Validation: Our advanced algorithms cross-reference your document against entries in the blockchain to verify its integrity. <br/>
                    Confirmation: Once validated, you'll receive confirmation that your document is authentic and untampered.
                </div>
                <div>
                    <img src={diagram} className='w-[40rem]'/>
                </div>
            </div>
            <Footer/>
        </div>
    </div>
  )
}
