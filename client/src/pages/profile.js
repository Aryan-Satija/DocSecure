import React, {useEffect, useState} from 'react'
import {apiConnector} from '../services/apiConnector.js';
import { PROFILE_APIS } from '../services/profile_apis';
import { UseSelector, useSelector } from 'react-redux';
export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const token = useSelector(state => state.auth);
  useEffect(()=>{
    const response = apiConnector('POST', PROFILE_APIS.fetch_my_profile_api, null, {
        'Authorization': `Bearer ${token}`
    });

    console.log(response);
  })
  return (
    <div>
        <div></div>
    </div>
  )
}
