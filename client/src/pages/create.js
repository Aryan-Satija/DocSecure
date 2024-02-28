import React from 'react';
import document_shield from '../assets/shield_document.png';
import { BsUpload } from "react-icons/bs";
export const Create = () => {
  return (
    <div className='px-4 py-24'>
      <div className='text-4xl text-gray-800/80 mb-8'>Secure Any Document....</div>
      <div className='flex justify-around'>
        <form className='py-8 px-4'>
            <div className='flex flex-col gap-2 min-w-[420px]'>
              <label>Public Key:</label>
              <input type='text' id='public_id' value={'0x045yahe9q9e73901js0001929sjznua'} className='border rounded-md p-2 w-full focus:outline-none pointer-events-none' readOnly/>
              <div className='mt-2'>
                <input type='file' id='file' name='file' accept='.pdf' className='hidden'/>
                <label htmlFor='file' className={'border py-2 px-4 rounded-md cursor-pointer flex items-center justify-between'}>Upload The Document <BsUpload/></label>
              </div>
              <div className='flex flex-col items-start mt-2 text-black/60'>
                  <label htmlFor='password'>Password:</label>
                  <input id='password' name='password' className='bg-black/10 p-2 w-full rounded-sm border-2 border-black/10 outline-none focus:border-white/40' type={'password'}/>
              </div>
              <div>
                <button className='border py-2 px-4 rounded-md'>Confirm</button>
              </div>
            </div>
        </form>
        <div>
            <img src={document_shield} className='w-[50rem] h-[35rem] rounded-md shadow-lg'/>
        </div>
      </div>
    </div>
  )
}
