import React, {useState} from 'react';
import Spline from '@splinetool/react-spline';
import OtpInput from 'react-otp-input';
import { apiConnector } from '../services/apiConnector';
import { AUTH_APIS } from '../services/auth_apis';
import { toast } from 'react-toastify';

export const Signup = () => {
  const [mode, setMode] = useState(0);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const changeModeHandler = ()=>{
    setFormData(prev => {
      return {
        ...prev,
        accountType: mode ? "Creator" : "Validator"
      }
    })
    setMode(1 - mode);
  }
  const [formData, setFormData] = useState({
    "accountType": "Creator",
    "username": "",
    "email": "",
    "password": ""
  })
  const [otp, setOtp] = useState('');

  const submitHandler = async(event)=>{
    event.preventDefault();
    const id = toast.loading("Please wait...")
    try{
        await apiConnector("POST", AUTH_APIS.sendotp_api, {
          email: formData.email
        })
        toast.update(id, { render: "Otp sent successfully", type: "success", isLoading: false, autoClose: 5000});
        setOtpGenerated(true);
    } catch(err){
      console.log(err);
      toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", isLoading: false, autoClose: 5000})
    }
  }

  const otpValidate = async(event)=>{
    event.preventDefault();
    const id = toast.loading("Please wait...")
    try{

        const response = await apiConnector("POST", AUTH_APIS.signup_api, {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          accountType: formData.accountType,
          input_otp: otp
        })
        toast.update(id, { render: "Otp sent successfully", type: "success", isLoading: false, autoClose: 5000 });
    } catch(err){
      console.log(err);
      toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", isLoading: false, autoClose: 5000})
    }
  }

  const changeHandler = (event)=>{ 
    setFormData(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    })
  }
  return (
    <div className={otpGenerated ? 'bg-black h-screen flex flex-col md:flex-row-reverse w-screen' : 'bg-black h-screen flex flex-col md:flex-row-reverse w-screen pr-16' }>
    {
        otpGenerated ? (<div className='w-full flex flex-col items-center justify-center'>
        <div className='font-special text-sky-800 text-4xl pb-8'>
          OTP HAS BEEN SHARED
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: '70px',
            aspectRatio: '1/1',
            backgroundColor: 'gray',
            opacity: '0.5',
            borderRadius: '10px',
            color: 'white'
          }}
          shouldAutoFocus={false}
        />
        <div>
          <button onClick={(event)=>{
              otpValidate(event);
          }} className="w-full text-center mt-8 bg-sky-800 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 font-special hover:scale-95">SUBMIT</button>
        </div>
      </div>) :
      (<>
        <div className='w-full md:w-[50%] md:h-full p-4 font-special flex flex-col md:justify-center gap-4'>
          <div className='text-4xl font-bold text-sky-800'>WELCOME</div>
          <p className='text-white/40'>Welcome to DocSecure: Verify Your Documents with Confidence!</p>
          <div className='text-white/60'>
            <div className='inline-flex gap-8 py-2 rounded-full px-2 bg-white/10' >
              <div className= {mode === 0 ? 'bg-sky-800/40 p-4 rounded-full cursor-pointer' : 'bg-sky-800/0 p-4 rounded-full cursor-pointer'} onClick={()=>{
                changeModeHandler();
              }}>Creator</div>
              <div className= {mode === 1 ? 'bg-sky-800/40 p-4 rounded-full cursor-pointer' : 'bg-sky-800/0 p-4 rounded-full cursor-pointer'} onClick={()=>{
                changeModeHandler();
              }}>Validator</div>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-white/60'>
            <label htmlFor="username">Username:</label>
            <input type={'text'} id="username" name="username" className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40' onChange={changeHandler}/>
          </div>
          <div className='flex flex-col gap-2 text-white/60'>
            <label htmlFor="email">Email:</label>
            <input type={'email'} id="email" name="email" className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40' onChange={changeHandler}/>
          </div>
          <div className='flex flex-col gap-2 text-white/60'>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" className='bg-white/10 p-2 rounded-sm border-2 border-white/10 outline-none focus:border-white/40' type={'password'} onChange={changeHandler}/>
          </div>
          <div>
            <button onClick={(event)=>{submitHandler(event)}} className="w-full text-center bg-sky-800 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 hover:scale-95">SIGN UP</button>
          </div>
        </div>
        <div className='w-full'>
          <Spline scene="https://prod.spline.design/rrutDNoWYDohzI7J/scene.splinecode"/>
        </div>
      </>)
    }
    </div>
  )
}
