import React, {useRef, useState} from 'react';
import document_shield from '../assets/shield_document.png';
import { BsUpload } from "react-icons/bs";
import {apiConnector} from '../services/apiConnector';
import { PDF_APIS } from '../services/pdf_apis';
import {useSelector} from 'react-redux';
export const Validate = () => {
  const fileInputRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [public_key, setPublic_key] = useState('');
  const {token} = useSelector(state => state.auth);
  const submitHandler = async(event)=>{
      event.preventDefault();
      const formData = new FormData();
      formData.append("pdfDocument", pdf);
      formData.append("public_key", public_key.toString());
      const response = await apiConnector(  
                                            "POST", 
                                            PDF_APIS.encrypt_user_pdf_api,                         
                                            formData,
                                            {
                                                "Content-Type": "multipart/form-data",
                                                'Authorization': `Bearer ${token}`
                                            }
                                          )
      console.log(response);
  }
  return (
    <div className='px-4 py-24 h-screen'>
      <div className='text-4xl text-gray-800/80 mb-8'>Validate Any Document....</div>
      <div className='flex flex-col lg:flex-row-reverse justify-around'>
        <form className='py-8 px-4'>
            <div className='flex flex-col gap-2 min-w-[420px]'>
              <label>Enter Public Key:</label>
              <input type='text' id='public_id' onChange={(event)=>{
                setPublic_key(event.target.value)
              }} className='border rounded-md p-2 w-full focus:outline-none '/>
              <div className=''>
                <input type='file' id='file' name='file' onChange={
                  (event)=>{
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