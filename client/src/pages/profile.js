import React, {useEffect, useState} from 'react'
import {apiConnector} from '../services/apiConnector.js';
import { PROFILE_APIS } from '../services/profile_apis';
import { UseSelector, useSelector } from 'react-redux';
export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const {token} = useSelector(state => state.auth);
  console.log(token);
  useEffect(()=>{
    (async()=>{
      const response = await apiConnector('POST', PROFILE_APIS.fetch_my_profile_api, null, {
          'Authorization': `Bearer ${token}`
      });
      setProfile(response.data.data);
    })()
  }, [])
  
  console.log(profile);

  return (
    <div className='pl-4 pt-20 flex flex-col gap-4'>
        <div>
            <img src={profile?.image} className='w-40 rounded-full'/>
        </div>
        <div className='flex items-center gap-4 text-xl'>
          <div className='text-slate-950/70 w-40 p-2'>Username:</div>
          <div className='text-slate-700'>
              {profile?.username}
          </div>
        </div>
        <div className='flex items-center gap-4 text-xl'>
          <div className='text-slate-950/70 w-40 p-2'>Email:</div>
          <div className='text-slate-700'>
              {profile?.email}
          </div>
        </div>
        <div className='flex items-center gap-4 text-xl'>
          <div className='text-slate-950/70 w-40 p-2'>Account Type:</div>
          <div className='text-slate-700'>
              {profile?.accountType}
          </div>
        </div>
        <div className='flex items-center gap-4 text-xl'>
          <div className='text-slate-950/70 w-40 p-2'>Public Key:</div>
          <div className='text-slate-700'>
              {profile?.public_key.substr(0, 110)}
              ....
          </div>
        </div>
        <div className='flex items-center gap-4 text-xl'>
          <div className='text-slate-950/70 w-40 p-2'>Private Key:</div>
          <div className='text-slate-700 border rounded-md p-2 bg-sky-400 cursor-pointer duration-200 hover:scale-95'>
              Generate Private Key            
          </div>
        </div>
    </div>
  )
}
