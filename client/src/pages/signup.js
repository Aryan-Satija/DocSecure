import React, {useState} from 'react';
import OtpInput from 'react-otp-input';
import { apiConnector } from '../services/apiConnector';
import { AUTH_APIS } from '../services/auth_apis';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import document from '../assets/about.png';
export const Signup = () => {
  const [mode, setMode] = useState(0);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const navigate = useNavigate();
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
    if(formData.username === "" || formData.email === "" || formData.password === ""){
      toast.error('all fields are required!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      return;
    }
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
        toast.update(id, { render: "task successfull", type: "success", isLoading: false, autoClose: 5000 });
        navigate('/login');    
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
    <div className={otpGenerated ? 'h-screen flex flex-col md:flex-row-reverse w-screen' : 'h-screen flex flex-col gap-4 p-4 justify-center md:justify-between items-center md:flex-row w-[100vw]' }>
    {
        otpGenerated ? (<div className='w-full flex flex-col items-center justify-center'>
        <div className='text-slate-100  text-4xl pb-8'>
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
          }} className="w-full text-center mt-8 bg-sky4800 text-richblack-900 cursor-pointer rounded-[8px] px-[24px] py-[12px] duration-200 font-special hover:scale-95">SUBMIT</button>
        </div>
      </div>) :
      (<>
        <div className='w-full  md:h-full p-4 flex flex-col md:justify-center gap-4'>
          <div className='text-4xl font-bold text-slate-100'>WELCOME</div>
          <p className='text-slate-400'>Welcome to DocSecure: Verify Your Documents with Confidence!</p>
          <div className='text-slate-950/80'>
            <div className='inline-flex gap-8 py-2 rounded-full px-2 bg-sky-400/20 text-slate-200' >
              <div className= {mode === 0 ? 'bg-sky-400/40 p-4 rounded-full cursor-pointer' : 'bg-sky-400/0 p-4 rounded-full cursor-pointer'} onClick={()=>{
                changeModeHandler();
              }}>Creator</div>
              <div className= {mode === 1 ? 'bg-sky-400/40 p-4 rounded-full cursor-pointer' : 'bg-sky-400/0 p-4 rounded-full cursor-pointer'} onClick={()=>{
                changeModeHandler();
              }}>Validator</div>
            </div>
          </div>
          <div className='flex flex-col gap-2 text-slate-200'>
            <label htmlFor="username">Username:</label>
            <input type={'text'} autoComplete={'off'} id="username" name="username" className='bg-slate-400/20 p-2 rounded-sm border-2 border-slate-600/60 outline-none focus:border-white/40' onChange={changeHandler} required={true}/>
          </div>
          <div className='flex flex-col gap-2 text-slate-200'>
            <label htmlFor="email">Email:</label>
            <input type={'email'} id="email" autoComplete={'off'} name="email" className='bg-slate-400/20 p-2 rounded-sm border-2 border-slate-600/60 outline-none focus:border-white/40' onChange={changeHandler} required={true}/>
          </div>
          <div className='flex flex-col gap-2 text-slate-200'>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" className='bg-slate-400/20 p-2 rounded-sm border-2 border-slate-600/60 outline-none focus:border-white/40' type={'password'} onChange={changeHandler} required={true}/>
          </div>
          <div>
            <button onClick={(event)=>{submitHandler(event)}} className="text-slate-100 bg-sky-600 p-2 w-full mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center">SIGN UP</button>
          </div>
        </div>
        <div className='w-full shadow-xl shadow-slate-700 hidden md:block'>
            <img src={document} className='w-[50rem] h-[35rem] rounded-md shadow-lg'/>
        </div>
      </>)
    }
    </div>
  )
}
