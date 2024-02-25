import React from 'react'
import { MdVerifiedUser, MdDarkMode } from "react-icons/md";
import {useNavigate} from 'react-router-dom';
export const Navbar = () => {
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between p-4 w-full border fixed'>
            <div>   
                <MdVerifiedUser className='size-8 text-green-500'/>
            </div>
            <div className='flex gap-4 w-[60%]'>
                <div className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Home</div>
                <div className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>About</div>
                <div className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Contact Us</div>
            </div>
            <div className='flex items-center gap-4 justify-center'>
                <div className='cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500' onClick={()=>{navigate('/login')}}>Login</div>
                <div className='cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500' onClick={()=>{navigate('/signup')}}>Sign Up</div>
                <div className='cursor-pointer'><MdDarkMode className='size-6 text-black-500'/></div>
            </div>
        </div>
    )
}
