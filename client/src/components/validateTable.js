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
  Textarea,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PDF_APIS } from '../services/pdf_apis';
import { useSelector } from 'react-redux';
import { GetGlobalProps } from '../context';
import { DOCUMENT_APIS } from '../services/document_apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ValidateTable = () => {
    const [files, setFiles] = useState(null);
    const [key, setKey] = useState("");
    const {token} = useSelector(state => state.auth)
    const {validateDoc} = GetGlobalProps();
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState([]);
    const getReport = async()=>{
        if(key === "" || files === null) return;
        setIsLoading(true);
        let completed = 0;
        let size = files?.length;
        const hashes = [];
        for(let i = 0; i < size; i++){
            const file = files[i];                 
            const formData = new FormData();
            formData.append("pdfDocument", file);
            formData.append("public_key", key);
            await (async()=>{
                const response = await axios.post(PDF_APIS.encrypt_user_pdf_api, formData, {
                    onUploadProgress: (progressEvent)=>{
                        setProgress(((progressEvent.progress*100*completed)/size))
                    },  
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Authorization': `Bearer ${token}`
                    }
                });
                const {hash} = response.data;
                hashes.push(hash); 
            })();
            completed += 1;
        }
        console.log(hashes)
        const response = await validateDoc(hashes, key);
        setProgress(100);
        setReport(response.split(','));
        setIsLoading(false);
    }
    console.log(report);
  return (
    <>
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>
                    <div className='mb-4'>DocSecure</div>
                </TableCaption>
                <Thead>
                <Tr>
                    <Th>Validate</Th>
                    <Th>Public Key</Th>
                    <Th>Status</Th>
                </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>
                            <Box display='flex' alignItems='center'>
                                <Input
                                    type='file'
                                    id='file-upload'
                                    display='none'
                                    multiple
                                    onChange={(e)=>{
                                        setFiles(e.target.files);
                                    }}
                                    accept='.pdf'
                                />
                                <label htmlFor='file-upload'>
                                    <Button as='span' colorScheme='green' cursor='pointer'>
                                        Choose File(s)
                                    </Button>
                                </label>
                                <Text ml={3} color='gray.500'>{(!files) ? "No file chosen" : "Files Selected"}</Text>
                            </Box>
                        </Td>
                        <Td>
                            <Box display='flex' alignItems='center' gap={4}>
                                <Textarea type='text' placeholder={"axmaacmaknc1c11xcnal3dc113alcv..."} rows={15} onChange={e => setKey(e.target.value)} className='text-slate-200'/>
                            </Box>
                        </Td>
                        <Td>
                            {
                                isLoading ?
                                <Progress value={progress} className='w-[200px]'/> : 
                                <Button colorScheme='blue'
                                onClick={getReport}
                                >Get Report</Button>
                            }
                        </Td>
                    </Tr>
                </Tbody>
                <Tfoot>
                <Tr>
                    <Th>Validate</Th>
                    <Th>Public Key</Th>
                    <Th>Status</Th>
                </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
        {
            report.length > 0 && 
            <Accordion>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' className='text-slate-200'>
                                Report
                            </Box>
                            <AccordionIcon className='bg-slate-200'/>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <TableContainer>
                            <Table variant='simple'> 
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Public Key</Th>
                                        <Th>Verdict</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        report.map((item, index) => (
                                            <>
                                                <Tr key={index} className='text-slate-200 mb-2'>
                                                    <Td>{files[index].name.substr(0, 20)}...</Td>
                                                    <Td>{key.substr(0, 20)}...</Td>
                                                    <Td className={item === '1' ? "text-red-500 bg-red-400/20 flex flex-row items-center justify-center rounded-full " : "text-green-500 bg-green-400/20 flex flex-row items-center justify-center rounded-full"}>{item === '1' ? "Fake" : "Original"}</Td>
                                                </Tr>
                                            </>
                                        ))
                                    }
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        }
    </>
  )
}
