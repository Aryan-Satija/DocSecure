import React, {useEffect, useState} from 'react'
import { Line } from 'react-chartjs-2';
import {apiConnector} from '../services/apiConnector.js';
import { PROFILE_APIS } from '../services/profile_apis';


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

    </div>
  )
}
