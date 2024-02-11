import React, {useState} from 'react';
import Spline from '@splinetool/react-spline';
export const Signup = () => {
  const [mode, setMode] = useState(0);
  const changeHandler = ()=>{
    setMode(1 - mode);
  }
  return (
    <div className='bg-black h-screen flex flex-col md:flex-row-reverse pr-16 w-screen '>
      <div className='w-full md:w-[50%] md:h-full p-4 font-special flex flex-col md:justify-center gap-4'>
        <div className='text-4xl font-bold text-sky-800'>WELCOME</div>
        <p className='text-white/40'>Welcome to DocSecure: Verify Your Documents with Confidence!</p>
        <div className='text-white/60'>
          <div className='inline-flex gap-8 py-2 rounded-full px-2 bg-white/10' >
            <div className= {mode === 0 ? 'bg-sky-800/40 p-4 rounded-full cursor-pointer' : 'bg-sky-800/0 p-4 rounded-full cursor-pointer'} onClick={()=>{
              changeHandler();
            }}>Creator</div>
            <div className= {mode === 1 ? 'bg-sky-800/40 p-4 rounded-full cursor-pointer' : 'bg-sky-800/0 p-4 rounded-full cursor-pointer'} onClick={()=>{
              changeHandler();
            }}>Validator</div>
          </div>
        </div>
        <div className='flex flex-col gap-2 text-white/60'>
          <label>Username:</label>
          <input type={'text'} className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40'/>
        </div>
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
