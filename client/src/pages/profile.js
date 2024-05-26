import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2';
import {apiConnector} from '../services/apiConnector.js';
import { PROFILE_APIS } from '../services/profile_apis';
import { useSelector } from 'react-redux';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Documents',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const {token} = useSelector(state => state.auth);
  console.log(token);
  useEffect(()=>{
    (async()=>{
      if(token){
          const response = await apiConnector('POST', PROFILE_APIS.fetch_my_profile_api, null, {
              'Authorization': `Bearer ${token}`
          });
          setProfile(response.data.data);
      }
    })()
  }, [token])
  
  console.log(profile);

  return (
    <div className='relative min-h-screen pl-4 pt-24 flex flex-col gap-4 overflow-x-hidden'>
        <div className='bg-[#74d36f]/20 absolute top-[-6rem] -z-5 right-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='bg-[#5348d6]/20 absolute top-[-1rem] -z-5 left-[-15rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem]'></div>
        <div className='w-[60%] min-w-[320px] z-10 mx-auto flex flex-col lg:flex-row items-center justify-between gap-8'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <img src={profile?.image} className='rounded-full w-40 shadow-xl shadow-slate-700'/>
                <div className='flex flex-row items-center justify-center gap-4'>
                  <button className='text-slate-100 bg-green-600 p-2 w-[8rem] mx-auto rounded-md shadow-md shadow-green-400 cursor-pointer hover:scale-95 duration-200 text-center'>ADD</button>
                  <button className='text-slate-100 bg-pink-900 p-2 w-[8rem] mx-auto rounded-md shadow-md shadow-pink-400 cursor-pointer hover:scale-95 duration-200 text-center'>DELETE</button>
                </div>
            </div>
            <div className='text-md text-slate-200 flex flex-col gap-4 font-bold '>
              <div><span className='text-slate-600 font-bold'>Username:</span> {profile?.username}</div>
              <div><span className='text-slate-600 font-bold'>Email:</span>    {profile?.email}</div>
              <div><span className='text-slate-600 font-bold'>Account Type:</span> {profile?.accountType}</div>
              <div className='hidden lg:block'><span className='text-slate-600 font-bold'>Public Key:</span> {profile?.public_key}</div>
              <div className='flex gap-4'>
                <button className='text-slate-100 bg-sky-600 p-2 mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center'>GENERATE PRIVATE KEY</button>
                {
                    profile?.accountType === 'Validator' ? (<button className='text-slate-100 bg-green-600 p-2 mx-auto rounded-md shadow-md shadow-green-400 cursor-pointer hover:scale-95 duration-200 text-center'>VALIDATE</button>) : (<button className='text-slate-100 bg-green-600 p-2 mx-auto rounded-md shadow-md shadow-green-400 cursor-pointer hover:scale-95 duration-200 text-center'>CREATE</button>)
                }
              </div>
            </div>
        </div>
        <div className='pt-4'>
          <Line data={data} width="1000%"/>
        </div>
        {/* <div>
            <div className='flex items-center justify-between'>
              <div>
                <img src={profile?.image} className='w-40 ml-8 rounded-full'/>
              </div>
            </div>

        </div>
        <div className='flex items-center gap-4'>
          <div className='text-slate-400 w-40 p-2'>Username:</div>
          <div className='text-slate-100'>
              {profile?.username}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-slate-400 w-40 p-2'>Email:</div>
          <div className='text-slate-100'>
              {profile?.email}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-slate-400 w-40 p-2'>Account Type:</div>
          <div className='text-slate-100'>
              {profile?.accountType}
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-slate-400 w-40 p-2'>Public Key:</div>
          <div className='text-slate-100'>
              {profile?.public_key.substr(0, 110)}
              ....
          </div>
        </div>
        <div className='flex items-center gap-4'>
          <div className='text-slate-400 w-40 p-2'>Private Key:</div>
          <div className='text-slate-100 bg-sky-600 p-2  mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center'>
              Generate Private Key            
          </div>
        </div> */}
    </div>
  )
}
