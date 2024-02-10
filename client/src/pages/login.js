import React from 'react';
import Spline from '@splinetool/react-spline';
export const Login = () => {
  return (
    <div className='bg-black h-screen flex flex-col md:flex-row w-screen '>
      <div className='w-full md:w-[50%] md:h-full p-4 font-special flex flex-col md:justify-center gap-4'>
        <div className='text-4xl font-bold text-sky-800'>WELCOME BACK</div>
        <p className='text-white/40'>Welcome to DocSecure: Verify Your Documents with Confidence!</p>
        <div className='flex flex-col gap-2 text-white/60'>
          <label>Email:</label>
          <input type={'email'} className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40'/>
        </div>
        <div className='flex flex-col gap-2 text-white/60'>
          <label>Password:</label>
          <input className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40' type={'password'}/>
        </div>
      </div>
      <div className='w-full'>
        <Spline scene="https://prod.spline.design/rrutDNoWYDohzI7J/scene.splinecode" />
      </div>
    </div>
  )
}
