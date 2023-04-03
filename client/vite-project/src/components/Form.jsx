import React, { useState } from 'react'
import axios from "axios"
import { Button, Checkbox, Flex, Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Text, useToast } from '@chakra-ui/react';
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiShow, BiHide } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';


const Form = ({url, title}) => {
    const navigate = useNavigate();
    const toast = useToast();
    const [userData, setUserData] = useState({})
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleChange = (ev) => {
        let { name, value } = ev.target;
        setUserData({...userData, [name]:value})
    }

    let postData = async() => {
        let res = await axios.post(url, userData);
        toast({
            position: "top",
            description: res.data.message,
            status: res.data.status,
            isClosable: true
        })
        if(res.data.token){

            localStorage.setItem('cointab-token', res.data.token);
            navigate("/home")
        }
    }

    let handleSubmit = async (ev) =>{
        ev.preventDefault();
        postData();
    }
  return (
    <>
        <form>
            <Heading size="sm" color="whatsapp.500" mt="15px" mb="10px">Email</Heading>
            <InputGroup>
                <InputLeftElement 
                pointerEvents='none'
                // fontSize='1.2em'
                color="whatsapp.600"
                children={<MdOutlineEmail/>}
                />  
                <Input colorScheme="whatsapp" type="email" placeholder={"johndoe@gmail.com"} name="email" onChange={handleChange}/>
            </InputGroup>
            <Heading mb="10px" size="sm" color="whatsapp.500" mt="15px">Password</Heading>
            <InputGroup size='md'>
                <InputLeftElement
                    pointerEvents='none'
                    // fontSize='1.2em'
                    color="whatsapp.600"
                    children={<RiLockPasswordLine/>}
                    /> 
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Minimum 8 characters'
                    name="password"
                    onChange={handleChange}
                />
                <InputRightElement>
                    <Button  size='2xl' onClick={handleClick} colorScheme="whatsapp" variant={"ghost"}>
                    {show ? <BiHide/>: <BiShow/>}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Flex justifyContent={"flex-start"} mt="10px" gap="5px">
                <Checkbox colorScheme={"whatsapp"}></Checkbox>
                <Text fontSize="12px" fontWeight={"600"} color="gray.500" >Remember me</Text>
            </Flex>
            <Button onClick={handleSubmit} colorScheme="whatsapp" mt="30px" w="100%">{title}</Button>
        </form>
    </>
  )
}

export default Form