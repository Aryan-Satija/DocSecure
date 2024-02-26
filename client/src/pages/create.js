import React from 'react'

export const Create = () => {
  return (
    <div className='px-4 py-24'>
      <div className='text-4xl text-gray-800/80'>Secure Any Document....</div>
      <form className='py-8 px-4'>
          <div className='flex shrink-0 flex-col justify-center gap-2'>
            <label >Public Key:</label>
            <input type='text' id='public_id' value={'0x045yahe9q9e73901js0001929sjznua'} className='border rounded-md p-2 w-[18rem] focus:outline-none pointer-events-none' readOnly/>
          </div>
      </form>
    </div>
  )
}
