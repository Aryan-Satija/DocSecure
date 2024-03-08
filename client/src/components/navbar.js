import React from 'react'
import { MdVerifiedUser, MdDarkMode } from "react-icons/md";
import {useNavigate, Link} from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';
export const Navbar = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)
    return (
        <div className='flex items-center justify-between p-4 w-full border fixed bg-white z-20'>
            <div>   
                <MdVerifiedUser className='size-8 text-green-500'/>
            </div>
            <div className='flex gap-4 w-[60%]'>
                {
                    token && <Link to="" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Profile</Link>
                }
                {
                    token && <Link to="/create" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Create</Link>
                }
                {
                    token && <Link to="/validate" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Validate</Link>
                }
                {
                    token && <Link to="" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Key</Link>
                }
                {
                    !token && <Link to="/home" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Home</Link>
                }
                {
                    !token && <Link to="" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>About</Link>
                }
                {
                    !token && <Link to="" className='flex-1 text-center cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Contact Us</Link>
                }
            </div>
            <div className='flex items-center gap-4 justify-center'>
                {
                    !token && <div className='cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500' onClick={()=>{navigate('/login')}}>Login</div>
                }
                {
                    !token && <div className='cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500' onClick={()=>{navigate('/signup')}}>Sign Up</div>
                }
                {
                    token && <div className='cursor-pointer border rounded-md p-2 hover:bg-gray-500/20 hover:backdrop-blur-md duration-500'>Connect To Wallet</div>
                }
            </div>
        </div>
    )
}
