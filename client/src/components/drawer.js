import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Spinner,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel
} from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/react';
import { GrSidebar } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { apiConnector } from '../services/apiConnector';
import { PROFILE_APIS } from '../services/profile_apis';
import { useNavigate } from 'react-router-dom';

export const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [profile, setProfile] = useState(null);
    const btnRef = React.useRef()
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();

    useEffect(()=>{
      (async()=>{
        if(token){
            const response = await apiConnector('POST', PROFILE_APIS.fetch_my_profile_api, null, {
                'Authorization': `Bearer ${token}`
            });
            setProfile(response.data.data);
        }
      })()
    }, [token])
    return (
      <div className='h-full w-full flex flex-col items-start justify-center'>
        <Button ref={btnRef} colorScheme='green' onClick={onOpen}>
          <GrSidebar/>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
          colorScheme='blackAlpha'
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
                {profile?.username}
            </DrawerHeader>
  
            <DrawerBody className='flex flex-col items-center gap-4'>
            {
                profile && 
                <Avatar size='2xl' name={profile.username} src={profile?.image} />
            }
            {
                !profile && 
                <Spinner/>
            }
            {
                profile && 
                <StatGroup className='flex flex-row items-center justify-between w-full mt-8'>
                    <Stat className='flex flex-col items-center'>
                        <StatLabel className='text-center'>Created</StatLabel>
                        <StatNumber className='text-center'>345</StatNumber>
                        <StatHelpText className='text-center'>
                            <StatArrow type='increase' />
                            2.36%
                        </StatHelpText>
                    </Stat>

                    <Stat className='flex flex-col items-center'>
                        <StatLabel className='text-center'>Validated</StatLabel>
                        <StatNumber className='text-center'>125</StatNumber>
                        <StatHelpText className='text-center'>
                            <StatArrow type='decrease' />
                            9.05%
                        </StatHelpText>
                    </Stat>
                </StatGroup>
            }
            </DrawerBody>
  
            <DrawerFooter className='w-full'>
                <Tabs isFitted variant='enclosed' className='w-full'>
                    <TabList mb='1em' className='text-xs'>
                        <Tab onClick={()=>{
                          navigate("/profile")
                        }}>Profile</Tab>
                        <Tab onClick={()=>{
                          navigate("/create")
                        }}>Create</Tab>
                        <Tab onClick={()=>{
                          navigate("/validate")
                        }}>Validate</Tab>
                    </TabList>
                </Tabs>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    )
}
