import React, {useRef, useState} from 'react';
import document_shield from '../assets/about.png';
import original from '../assets/original.png';
import fake from '../assets/Fake.png';
import { BsUpload } from "react-icons/bs";
import {apiConnector} from '../services/apiConnector';
import { PDF_APIS } from '../services/pdf_apis';
import {useSelector} from 'react-redux';
import { GetGlobalProps } from '../context';
import { toast } from 'react-toastify';
export const Validate = () => {
  const fileInputRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [public_key, setPublic_key] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [verd, setVerd] = useState('');
  const {token} = useSelector(state => state.auth);
  const {validateDoc} = GetGlobalProps();
  const submitHandler = async(event)=>{
      event.preventDefault();
      const idx = toast.loading('Loading..please wait')
      
      const formData = new FormData();
      formData.append("pdfDocument", pdf);
      formData.append("public_key", public_key);
      const response = await apiConnector(  
                                            "POST", 
                                            PDF_APIS.encrypt_user_pdf_api,                         
                                            formData,
                                            {
                                                "Content-Type": "multipart/form-data",
                                                'Authorization': `Bearer ${token}`
                                            }
                                          )
      const {hash} = response.data;
      const verdict = await validateDoc(hash, public_key)
      setVerd(verdict.toLowerCase());
      setOpenModal(true);
      if(verdict.toLowerCase() === 'original'){
        toast.update(idx, {render: `ORIGINAL`, type: 'success', isLoading: false, autoClose: 5000});
      }
      else{
        toast.update(idx, {render: `FAKE`, type: 'error', isLoading: false, autoClose: 5000})
      }
  }
  return (
    <div className='px-4 min-h-screen flex flex-col justify-center items-center'>
      <div className='text-4xl text-slate-100 mb-8 mt-16'>Validate Any Document....</div>
      <div className='flex flex-col lg:flex-row-reverse justify-around lg:justify-center items-center'>
        <form className='py-8 px-4'>
            <div className='flex flex-col gap-2 min-w-[420px]'>
              <div className='text-slate-200'>Enter Public Key:</div>
              <textarea type='text' id='public_id' rows={14} onChange={(event)=>{
                    const inputValue = event.target.value;
                    // Normalize line endings to Unix format
                    const normalizedValue = inputValue.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                    setPublic_key(normalizedValue);
              }} className='rounded-md p-2 text-slate-200 w-full bg-black focus:outline-none resize-none' spellCheck={false}/>
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
                <label htmlFor='file' ref={fileInputRef} className={'text-slate-100 bg-sky-600 shadow-md shadow-sky-400 py-2 px-4 hover:scale-95 duration-200 rounded-md cursor-pointer flex items-center justify-between'}>Upload The Document <BsUpload/></label>
              </div>
              <div>
                <button className='text-slate-100 bg-sky-600 p-2 w-[8rem] mx-auto rounded-md shadow-md shadow-sky-400 cursor-pointer hover:scale-95 duration-200 text-center' onClick={submitHandler}>Confirm</button>
              </div>
            </div>
        </form>
        <div>
            <img src={document_shield} className='w-[50rem] h-[35rem] rounded-md shadow-lg hidden lg:block'/>
        </div>
      </div>
      {
        openModal && verd === 'original' &&
        <div className='absolute mt-20 bg-slate-400/40 rounded-md backdrop-blur-md p-4' onClick={()=>{
          setOpenModal(false);
        }}>
          <div className='text-4xl text-slate-400 font-bold'>Verdict :</div>
          <div>
              <img src={original} width={500} />
              <div className='w-[500px] font-bold text-green-900'>
                  Our analysis revealed no signs of tampering or alterations, and all elements within the document align with our records and expectations.
              </div>
          </div>
        </div>
      }
      {
        openModal && verd === 'fake' && 
        <div className='absolute mt-20 bg-slate-400/40 rounded-md backdrop-blur-md p-4' onClick={()=>{
          setOpenModal(false);
        }}>
          <div className='text-4xl text-slate-900 font-bold'>Verdict :</div>
          <div>
              <img src={fake} width={500} />
              <div className='w-[500px] text-red-900 font-bold'>Our investigation has revealed several discrepancies and inconsistencies within the document, indicating a deliberate attempt to deceive</div>
          </div>
        </div>
      }
    </div>
  )
}