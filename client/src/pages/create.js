import React, {useRef, useState} from 'react';
import {apiConnector} from '../services/apiConnector';
import { DOCUMENT_APIS } from '../services/document_apis';
import { PDF_APIS } from '../services/pdf_apis';
import {useSelector} from 'react-redux';
import { GetGlobalProps } from '../context';
import { SideDrawer } from '../components/drawer';
import { UploadTable } from '../components/uploadTable';

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
    <div className='px-4 min-h-screen flex flex-row gap-4 items-center justify-center pt-[5.5rem]'>
      <div>
        <SideDrawer/>
      </div>
      <div className='w-full flex flex-col gap-8 items-center'>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-gray-200 text-4xl'>Upload Document</div>
          <p className='text-gray-500 text-center w-[80%]'>Whether you're a seasoned professional managing sensitive contracts, a diligent student submitting crucial research papers, or anyone in between, DocSecure provides the assurance and peace of mind you need.</p>
        </div>
        <div className='mx-auto w-[95%] md:w-[80%]'>
          <UploadTable/>
        </div>
      </div>
    </div>
  )
}
