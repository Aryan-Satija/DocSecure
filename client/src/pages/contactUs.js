import React from 'react'
import contact_us from '../assets/contact_us.png'
export const ContactUs = () => {
  return (
    <div className="pt-24">
        <div className="text-sky-400 text-4xl text-center">Got an Idea? We’ve got the skills. Let’s team up</div>
        <div className="text-slate-950/80 text-base text-center mb-8 pt-4">Tall us more about yourself and what you’re got in mind.</div>
        <div className='w-full flex flex-col items-center justify-center'>
          <form className="flex items-center justify-around gap-2 p-2 w-full">
              <div className=''>
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
                  <img src={contact_us} width={500} className='rounded-md shadow-slate-600 shadow-md'/>
              </div>
          </form>
        </div>
    </div>
  )
}
