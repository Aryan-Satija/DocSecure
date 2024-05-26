import React, {useState} from 'react';
import { AUTH_APIS } from '../services/auth_apis.js';
import {apiConnector} from '../services/apiConnector.js';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { setToken } from '../slices/authSlice.js';
import document from '../assets/about.png';
export const Login = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

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
        dispatch(setToken(response.data.token));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.update(id, { render: "Welcome", type: "success", isLoading: false, autoClose: 5000 });
        navigate('/profile')
    } catch(err){
      console.log(err);
      toast.update(id, { render: `${err?.response?.data?.message}`, type: "error", isLoading: false, autoClose: 5000 })
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
    <div className='min-h-screen flex flex-col gap-4 p-4 justify-center md:justify-between items-center md:flex-row w-[100vw] '>
      <div className='w-full md:h-full p-4 flex flex-col md:justify-center gap-4'>
        <div className='text-4xl font-bold text-slate-100'>WELCOME BACK</div>
        <p className='text-slate-400'>Welcome to DocSecure: Verify Your Documents with Confidence!</p>
        <div className='flex flex-col gap-2 text-slate-200/80'>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type={'email'} autoComplete={'off'} className='bg-slate-400/20 p-2 rounded-sm border-2 border-slate-600/60 outline-none focus:border-white/40' onChange={(event)=>{
              changeHandler(event);
          }}/>
        </div>
        <div className='flex flex-col gap-2 text-slate-200/80'>
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' autoComplete={'off'} className='bg-slate-400/20 p-2 rounded-sm border-2 border-slate-600/60 outline-none focus:border-white/40' type={'password'} onChange={(event)=>{
              changeHandler(event);
          }}/>
        </div>
        <div className="w-full">
          <button onClick={(event)=>{submitHandler(event)}} className="text-slate-100 bg-sky-600 p-2 w-full mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center">LOGIN</button>
        </div>
      </div>
      <div className='w-full shadow-xl shadow-slate-700 hidden md:block'>
        <img src={document} className='w-[50rem] h-[35rem] rounded-md shadow-lg'/>
      </div>
    </div>
  )
}
