import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button,
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  Progress
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PDF_APIS } from '../services/pdf_apis';
import { useSelector } from 'react-redux';
import { GetGlobalProps } from '../context';
import { DOCUMENT_APIS } from '../services/document_apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const UploadTable = () => {
    const [sliderValue, setSliderValue] = useState(50);
    const [files1, setFiles1] = useState(null);
    const [files2, setFiles2] = useState(null);
    const [files3, setFiles3] = useState(null);
    const [files4, setFiles4] = useState(null);
    const [queue, setQueue] = useState([]);
    const [progress, setProgress] = useState([0, 0, 0, 0]);
    const {token} = useSelector(state => state.auth)
    const {addPdfHash} = GetGlobalProps();

    const uploadFiles = async()=>{
        for (const task of queue){
            let names = [];
            let hashes = [];
            let publicKeys = [];
            if(task == 1){
                let completed = 0;
                let size = files1?.length;
                for(let i = 0; i < size; i++){
                    const file = files1[i];                 
                    const formData = new FormData();
                    formData.append("pdfDocument", file);
                    await (async()=>{
                        const response = await axios.post(PDF_APIS.encrypt_pdf_api, formData, {
                            onUploadProgress: (progressEvent)=>{
                                setProgress((prev)=>{
                                    return prev.map((progress, index)=>{
                                        if(index == task - 1){
                                            return ((progressEvent.progress*100*completed)/size);
                                        }
                                        return progress;
                                    })
                                });
                            },  
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const {hash, public_key} = response.data; 
                        publicKeys.push(public_key);
                        hashes.push(hash);
                        names.push(file.name);
                    })();
                    completed += 1;
                }
            }
            else if(task == 2){
                let completed = 0;
                let size = files2?.length;
                for(let i = 0; i < size; i+=1){
                    const file = files2[i];
                    console.log(file);                    
                    const formData = new FormData();
                    formData.append("pdfDocument", file);
                    await (async()=>{
                        const response = await axios.post(PDF_APIS.encrypt_pdf_api, formData, {
                            onUploadProgress: (progressEvent)=>{
                                setProgress((prev)=>{
                                    return prev.map((progress, index)=>{
                                        if(index == task - 1){
                                            return ((progressEvent.progress*100*completed)/size);
                                        }
                                        return progress;
                                    })
                                });
                            },  
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const {hash, public_key} = response.data;
                        publicKeys.push(public_key); 
                        hashes.push(hash);
                        names.push(file.name);
                    })();
                    completed += 1;
                }

            }
            else if(task == 3){
                let completed = 0;
                let size = files3?.length;
                for(let i = 0; i < size; i+=1){
                    const file = files3[i];                   
                    const formData = new FormData();
                    formData.append("pdfDocument", file);
                    await (async()=>{
                        const response = await axios.post(PDF_APIS.encrypt_pdf_api, formData, {
                            onUploadProgress: (progressEvent)=>{
                                setProgress((prev)=>{
                                    return prev.map((progress, index)=>{
                                        if(index == task - 1){
                                            return ((progressEvent.progress*100*completed)/size);
                                        }
                                        return progress;
                                    })
                                });
                            },  
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const {hash, public_key} = response.data; 
                        publicKeys.push(public_key);
                        hashes.push(hash);
                        names.push(file.name);
                    })();
                    completed += 1;
                }
            }
            else{
                let completed = 0;
                let size = files4?.length;
                for(let i = 0; i < size; i+=1){
                    const file = files4[i];                 
                    const formData = new FormData();
                    formData.append("pdfDocument", file);
                    await (async()=>{
                        const response = await axios.post(PDF_APIS.encrypt_pdf_api, formData, {
                            onUploadProgress: (progressEvent)=>{
                                setProgress((prev)=>{
                                    return prev.map((progress, index)=>{
                                        if(index == task - 1){
                                            return ((progressEvent.progress*100*completed)/size);
                                        }
                                        return progress;
                                    })
                                });
                            },  
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        const {hash, public_key} = response.data; 
                        publicKeys.push(public_key); 
                        hashes.push(hash);
                        names.push(file.name);
                    })();
                    completed += 1;
                }
            }
            toast.success(`Task-${task} Created Hashes`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
            const txHash = await addPdfHash(hashes, names, publicKeys);
            setProgress((prev)=>{
                return prev.map((progress, index)=>{
                    if(index == task - 1){
                        return 100;
                    }
                    return progress;
                })
            });
            if(txHash){
                toast.success(`Task-${task} Uploaded To Blockchain`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    // transition: Bounce,
                });
    
                let size = names.length;
                for (let i  = 0; i < size; i++){
                    const response = await axios.post(DOCUMENT_APIS.create_document_api, {
                        name: names[i],
                        txHash
                    }, {
                        onUploadProgress: (progressEvent)=>{
                            setProgress((prev)=>{
                                return prev.map((progress, index)=>{
                                    if(index == task - 1){
                                        return ((progressEvent.progress*100*i)/size);
                                    }
                                    return progress;
                                })
                            });
                        },  
                        headers: {
                            "Content-Type": "multipart/form-data",
                            'Authorization': `Bearer ${token}`
                        }
                    })
                }
                setProgress((prev)=>{
                    return prev.map((progress, index)=>{
                        if(index == task - 1){
                            return (100);
                        }
                        return progress;
                    })
                });
            }
            toast.success(`Task-${task} Task Completed`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                // transition: Bounce,
            });
        }
        setQueue([]);
        setFiles1(null);
        setFiles2(null);
        setFiles3(null);
        setFiles4(null);
    }

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>
            <div className='mt-4'>DocSecure</div>
            <div className='mx-auto w-full sm:w-[70%] md:w-[50%] mt-4'>
                <Slider aria-label='slider-ex-4' defaultValue={sliderValue} onChange={(val)=>{
                    setSliderValue(val)
                }}>
                    <SliderTrack bg='green.100'>
                        <SliderFilledTrack bg='green' />
                    </SliderTrack>
                    <SliderThumb boxSize={6}>
                        <Box color='green' />
                    </SliderThumb>
                </Slider>
            </div>
            <div>
                <Button onClick={uploadFiles}>Upload Files</Button>
            </div>
            <div className='ext-white text-center'>{sliderValue}</div>
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Upload</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
            <Tr>
                <Td>
                    <Box display='flex' alignItems='center' gap={4}>
                        <Input type='text' placeholder={"John's Marksheet"} />
                        <Button colorScheme='green'>Default</Button>
                    </Box>
                </Td>
                <Td>
                    <Box display='flex' alignItems='center'>
                        <Input
                            type='file'
                            id='file-upload-1'
                            display='none'
                            multiple
                            onChange={(e)=>{
                                setFiles1(e.target.files);
                            }}
                            accept='.pdf'
                        />
                        <label htmlFor='file-upload-1'>
                            <Button as='span' colorScheme='green' cursor='pointer'>
                                Choose File(s)
                            </Button>
                        </label>
                        <Text ml={3} color='gray.500'>{(!files1) ? "No file chosen" : "Files Selected"}</Text>
                    </Box>
                </Td>
                <Td>
                    {
                        queue.includes(1) ?
                        <Progress value={progress[0]} className='w-[200px]'/>
                        : 
                        <Button colorScheme='blue'
                            onClick={()=>{
                                if(!files1) return;
                                setQueue((prev)=>{
                                    return [...prev, 1];
                                })
                            }}
                        >Add To Queue</Button>
                    }
                </Td>
            </Tr>
            {
                sliderValue >= 25 &&
                <Tr>
                    <Td>
                        <Box display='flex' alignItems='center' gap={4}>
                            <Input type='text' placeholder={"John's Marksheet"} />
                            <Button colorScheme='green'>Default</Button>
                        </Box>
                    </Td>
                    <Td>
                        <Box display='flex' alignItems='center'>
                            <Input
                                type='file'
                                id='file-upload-2'
                                display='none'
                                multiple
                                onChange={(e)=>{
                                    setFiles2(e.target.files);
                                }}
                                accept='.pdf'
                            />
                            <label htmlFor='file-upload-2'>
                                <Button as='span' colorScheme='green' cursor='pointer'>
                                    Choose File(s)
                                </Button>
                            </label>
                            <Text ml={3} color='gray.500'>{(!files2) ? "No file chosen" : "Files Selected"}</Text>
                        </Box>
                    </Td>
                    <Td>
                    {
                        queue.includes(2) ?
                        <Progress value={progress[1]} className='w-[200px]'/>
                        : 
                        <Button colorScheme='blue'
                            onClick={()=>{
                                if(!files2) return;
                                setQueue((prev)=>{
                                    return [...prev, 2];
                                })
                            }}
                        >Add To Queue</Button>
                    }
                    </Td>
                </Tr>
            }
            {
                sliderValue >= 50 &&
                <Tr>
                    <Td>
                        <Box display='flex' alignItems='center' gap={4}>
                            <Input type='text' placeholder={"John's Marksheet"} />
                            <Button colorScheme='green'>Default</Button>
                        </Box>
                    </Td>
                    <Td>
                        <Box display='flex' alignItems='center'>
                            <Input
                                type='file'
                                id='file-upload-3'
                                display='none'
                                multiple
                                onChange={(e)=>{
                                    setFiles3(e.target.files);
                                }}
                                accept='.pdf'
                            />
                            <label htmlFor='file-upload-3'>
                                <Button as='span' colorScheme='green' cursor='pointer'>
                                    Choose File(s)
                                </Button>
                            </label>
                            <Text ml={3} color='gray.500'>{(!files3) ? "No file chosen" : "Files Selected"}</Text>
                        </Box>
                    </Td>
                    <Td>
                    {
                        queue.includes(3) ?
                        <Progress value={progress[2]} className='w-[200px]'/>
                        : 
                        <Button colorScheme='blue'
                            onClick={()=>{
                                if(!files3) return;
                                setQueue((prev)=>{
                                    return [...prev, 3];
                                })
                            }}
                        >Add To Queue</Button>
                    }
                    </Td>
                </Tr>
            }
            {
                sliderValue >= 75 &&
                <Tr>
                    <Td>
                        <Box display='flex' alignItems='center' gap={4}>
                            <Input type='text' placeholder={"John's Marksheet"} />
                            <Button colorScheme='green'>Default</Button>
                        </Box>
                    </Td>
                    <Td>
                        <Box display='flex' alignItems='center'>
                            <Input
                                type='file'
                                id='file-upload-4'
                                display='none'
                                multiple
                                onChange={(e)=>{
                                    setFiles4(e.target.files);
                                }}
                                accept='.pdf'
                            />
                            <label htmlFor='file-upload-4'>
                                <Button as='span' colorScheme='green' cursor='pointer'>
                                    Choose File(s)
                                </Button>
                            </label>
                            <Text ml={3} color='gray.500'>{(!files4) ? "No file chosen" : "Files Selected"}</Text>
                        </Box>
                    </Td>
                    <Td>
                    {
                        queue.includes(4) ?
                        <Progress value={progress[3]} className='w-[200px]'/>
                        : 
                        <Button colorScheme='blue'
                            onClick={()=>{
                                if(!files4) return;
                                setQueue((prev)=>{
                                    return [...prev, 4];
                                })
                            }}
                        >Add To Queue</Button>
                    }
                    </Td>
                </Tr>
            }
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>Upload</Th>
            <Th>Status</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )
}
