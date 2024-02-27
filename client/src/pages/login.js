import React, {useState, useEffect} from 'react';
import Spline from '@splinetool/react-spline';
import { AUTH_APIS } from '../services/auth_apis.js';
import {apiConnector} from '../services/apiConnector.js';
import { toast } from 'react-toastify';

export const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  })

  const submitHandler = async(event)=>{
    event.preventDefault();
    const id = toast.loading("Please wait...")
    try{
        const response = await apiConnector("POST", AUTH_APIS.login_api, {
          'email': formData.email,
          'password': formData.password
        })
        console.log(response);
        toast.update(id, { render: "Welcome", type: "success", isLoading: false });
    } catch(err){
      console.log(err);
      toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", isLoading: false, autoClose: 5000})
    }
  }

  const changeHandler = (event)=>{
    setFormData(prev => {
      return {
        ...prev,
        [event.target.name]  : event.target.value
      }
    })
  }

  return (
    <div className='bg-black h-screen flex flex-col md:flex-row w-screen '>
      <div className='w-full md:w-[50%] md:h-full p-4 font-special flex flex-col md:justify-center gap-4'>
        <div className='text-4xl font-bold text-sky-800'>WELCOME BACK</div>
        <p className='text-white/40'>Welcome to DocSecure: Verify Your Documents with Confidence!</p>
        <div className='flex flex-col gap-2 text-white/60'>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type={'email'} className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40' onChange={(event)=>{
              changeHandler(event);
          }}/>
        </div>
        <div className='flex flex-col gap-2 text-white/60'>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40' type={'password'} onChange={(event)=>{
              changeHandler(event);
          }}/>
        </div>
        <div className="w-full">
          <button onClick={(event)=>{submitHandler(event)}} className="w-full text-center bg-sky-800 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 hover:scale-95">LOGIN</button>
        </div>
      </div>
      <div className='w-full'>
        <Spline scene="https://prod.spline.design/rrutDNoWYDohzI7J/scene.splinecode" />
      </div>
    </div>
  )
}
