import React, {useRef, useState} from 'react';
import document_shield from '../assets/shield_document.png';
import { BsUpload } from "react-icons/bs";
import {apiConnector} from '../services/apiConnector';
import { PDF_APIS } from '../services/pdf_apis';
import {useSelector} from 'react-redux';
import { GetGlobalProps } from '../context';
export const Create = () => {
  const fileInputRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const {addPdfHash} = GetGlobalProps();
  const {token} = useSelector(state => state.auth)

  const submitHandler = async(event)=>{
      event.preventDefault();
      const formData = new FormData();
      formData.append("pdfDocument", pdf);
      const response = await apiConnector(  
                                            "POST", 
                                            PDF_APIS.encrypt_pdf_api,                         
                                            formData,
                                            {
                                                "Content-Type": "multipart/form-data",
                                                'Authorization': `Bearer ${token}`
                                            }
                                          )
      // console.log(response);
      const {hash, public_key} = response.data; 
      await addPdfHash(hash, public_key)
  }

  return (
    <div className='px-4 py-24 h-screen'>
      <div className='text-4xl text-gray-800/80 mb-8'>Secure Any Document....</div>
      <div className='flex flex-col lg:flex-row justify-around'>
        <form className='py-8 px-4'>
            <div className='flex flex-col gap-2 min-w-[420px]'>
              <label>Public Key:</label>
              <input type='text' id='public_id' value={'0x045yahe9q9e73901js0001929sjznua'} className='border rounded-md p-2 w-full focus:outline-none pointer-events-none' readOnly/>
              <div className='mt-2'>
                <input type='file' id='file' name='file' onChange={
                  (event)=>{
                    console.log(event);
                    const file = event.target.files[0];
                    setPdf(file);
                    const reader = new FileReader();
                    reader.readAsDataURL(file)
                    reader.onloadend = ()=>{
                    }
                  }
                } accept='.pdf' className='hidden'/>
                <label htmlFor='file' ref={fileInputRef} className={'border py-2 px-4 rounded-md cursor-pointer flex items-center justify-between'} >Upload The Document <BsUpload/></label>
              </div>
              <div>
                <button className='border py-2 px-4 rounded-md' onClick={submitHandler}>Confirm</button>
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
