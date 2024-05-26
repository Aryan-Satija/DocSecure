import React from 'react'
import contact_us from '../assets/globe.png'
export const ContactUs = () => {
  return (
    <div className="py-20 w-[80%] min-w-[320px] mx-auto min-h-screen flex flex-col items-center">
        <div className="bg-gradient-to-r from-[#7448d4] to-[#d680ff] inline-block text-transparent bg-clip-text text-4xl text-center">Want To get In the touch?</div>
        <div className="text-slate-400 text-base text-center mb-8 pt-4">Tall us more about yourself and what you’re got in mind.</div>
        <div className='w-full flex flex-col items-center justify-center'>
          <form className="flex flex-col lg:flex-row items-center text-slate-100 justify-around gap-6 p-2 w-full">
              <div className='w-[100%]'>
                <div>
                  <label htmlFor='fname' className='cursor-pointer'>First Name:</label>
                  <input type='text' id='fname' className='bg-slate-400/20 p-2 w-full rounded-sm border-1 border-slate-600/60 outline-none focus:border-white/40' spellCheck={'off'}/>
                  <label htmlFor='lname' className='cursor-pointer'>Last Name:</label>
                  <input type='text' id='lname' className='bg-slate-400/20 p-2 w-full rounded-sm border-1 border-slate-600/60 outline-none focus:border-white/40' spellCheck={'off'}/>
                </div>
                <label htmlFor='email' className='cursor-pointer'>Enter your email:</label>
                <input type='email' id='email' className='bg-slate-400/20 p-2 w-full rounded-sm border-1 border-slate-600/60 outline-none focus:border-white/40' spellCheck={'off'}/>
                <label className='cursor-pointer'>Tell us about your idea</label>
                <textarea className='bg-slate-400/20 p-2 w-full rounded-sm border-1 border-slate-600/60 outline-none focus:border-white/40 ' rows={8}>
                </textarea>
              </div>
              <div >
                  <img src={contact_us} className='rounded-full shadow-xl shadow-slate-700'/>
              </div>
          </form>
        </div>
    </div>
  )
}
