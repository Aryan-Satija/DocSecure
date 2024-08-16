import React, {useRef, useState} from 'react';
import document_shield from '../assets/about.png';
import { BsUpload } from "react-icons/bs";
import {apiConnector} from '../services/apiConnector';
import { DOCUMENT_APIS } from '../services/document_apis';
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
      const {hash, public_key} = response.data; 
      const txhash = await addPdfHash(hash, public_key)
      if(txhash){
        await apiConnector('POST', DOCUMENT_APIS.create_document_api, { 
          name: 'Hello World', 
          txHash: txhash
        }, {
          'Authorization': `Bearer ${token}`
        });
      }                           
    }

  return (
    <div className='px-4 h-screen flex flex-col items-center justify-center'>
      <div className='text-4xl text-gray-100 mb-8 mt-16'>Secure Any Document....</div>
      <div className='flex flex-col lg:flex-row justify-center items-center lg:justify-around'>
        <form className='py-8 px-4'>
            <div className='flex flex-col gap-2 min-w-[420px] text-slate-200'>
              <label>Public Key:</label>
              <input type='text' id='public_id' value={'0x045yahe9q9e73901js0001929sjznua'} className='rounded-md p-2 w-full focus:outline-none pointer-events-none bg-black' readOnly/>
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
                <label htmlFor='file' ref={fileInputRef} className={'text-slate-100 bg-sky-600 shadow-md shadow-sky-400 py-2 px-4 hover:scale-95 duration-200 rounded-md cursor-pointer flex items-center justify-between'} >Upload The Document <BsUpload/></label>
              </div>
              <div>
                <button className='text-slate-100 bg-sky-600 p-2 w-[8rem] mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center' onClick={submitHandler}>Confirm</button>
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
