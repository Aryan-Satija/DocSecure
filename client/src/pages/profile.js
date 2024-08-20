import React, {useEffect, useState} from 'react'
import { SideDrawer } from '../components/drawer.js';
import {apiConnector} from '../services/apiConnector.js';
import { PROFILE_APIS } from '../services/profile_apis';
import { useSelector } from 'react-redux';
import { 
  Stack, 
  Card, 
  CardBody, 
  CardFooter, 
  Heading, 
  Box, 
  Text, 
  Image, 
  Divider, 
  Button, 
  ButtonGroup, 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel, 
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { DOCUMENT_APIS } from '../services/document_apis.js';
import { Link } from 'react-router-dom';
import {IoStarOutline} from 'react-icons/io5'
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const data = {
  labels: labels,
  datasets: [{
    label: 'Documents',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};
export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [docs, setDocs] = useState([]);
  const {token} = useSelector(state => state.auth);
  useEffect(()=>{
    (async()=>{
      if(token){
          let response = await apiConnector('POST', PROFILE_APIS.fetch_my_profile_api, null, {
              'Authorization': `Bearer ${token}`
          });
          setProfile(response.data.data);
          response = await apiConnector('POST', DOCUMENT_APIS.get_document_api, null, {
            'Authorization': `Bearer ${token}`
          });
          setDocs(response.data.data);
      }
    })()
  }, [token])

  return (
    <div className='px-4 min-h-screen flex flex-row gap-4 items-center justify-center pt-[5.5rem]'>
      <div>
        <SideDrawer/>
      </div>
      <div className='w-full flex flex-wrap gap-8 items-center justify-center'>
        <div className='flex flex-col items-center'>
          <Card maxW='md' bg='gray.800'>
            <CardBody>
              <Image
                src={profile?.image}
                borderRadius='lg'
                height={'200px'}
                width={'400px'}
                objectFit={'cover'}
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md' color={'gray.400'}>{profile?.username}</Heading>
                <Text size='sm' color={'gray.400'}>{profile?.email}</Text>
                <Text size='sm' color={'gray.400'}>{profile?.accountType}</Text>
                <Text size='sm' color={'gray.400'}>
                <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          Public Key
                        </Box>
                        <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                          {
                            profile?.public_key
                          }
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing='2'>
                <Button variant='solid' colorScheme='green'>
                  Create
                </Button>
                <Button variant='ghost' colorScheme='green'>
                  Validate
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        </div>
        <div className='flex flex-col items-center'>
          <Card maxW='4xl' bg='gray.900'>
            <CardBody>
              <TableContainer>
                <Table variant='simple'>
                  <TableCaption>Recent Documents Created</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Created At</Th>
                      <Th>EtherScan</Th>
                      <Th>Starred</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      docs.slice(0, 6).map((doc, index)=>{
                        return (
                          <Tr key={index} color={'gray.200'}>
                            <Td>{doc.name.substr(0, 10)}...</Td>
                            <Td>{doc.createdAt}</Td>
                            <Td color={'blue.600'}><Link to={`https://sepolia.etherscan.io/tx/${doc.txHash}`}>View On EtherScan</Link></Td>
                            <Td color={'green.600'}><IoStarOutline/></Td>
                          </Tr>
                        )
                      })
                    }
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Created At</Th>
                      <Th>EtherScan</Th>
                      <Th>Starred</Th>
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}
