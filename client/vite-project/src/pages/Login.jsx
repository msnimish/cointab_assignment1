import {
  Flex,
  Heading,
  Image,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  useDisclosure,
  Box,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  useToast
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Form from "../components/Form";
import { backend_url } from "./AllRoutes";

const Login = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState();
  const firstField = React.useRef();
  let [userData, setUserData] = useState({});
  let url = `${backend_url}/user/register`;

  let handleChange = (ev) => {
    let {name, value} = ev.target;
    setUserData({...userData, [name]:value})
  }

  let handleShow = () => {
    setShow(!show);
  }

  let postData = async() => {
    if(userData.password.length < 8){
      toast({
        position: "top",
        description: "Minimum 8 characters required",
        status: "warning",
        duration: 9000,
        isClosable: true
      })
    }else{
      let res = await axios.post(url, userData);
      console.log(res);
      toast({
        position: "top",
        description: res.data.message,
        status: res.data.status,
        duration: 9000,
        isClosable: true
      })
      if(res.data.status==="success"){
        onClose();
      }
    }
    
  }
  
  let handleSubmit = async (ev) =>{
    ev.preventDefault();
    console.log(userData);
      postData();
  }


  return (
    <Flex w="100vw" margin="auto" bg="green.200" h="100%">
      <Flex
        w="30%"
        m="auto"
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="center"
        bg="white"
        p="40px 25px"
        borderRadius={"30px"}
      >
        <Image src="./cointab.png" w="100px" mb="20px" />
        <Heading size="xl" textAlign={"center"}>
          Welcome to <br></br><span style={{ color: "#00D884" }}>Cointab</span>
        </Heading>
        <Form url={`${backend_url}/user/login`} title="Login" />
        <Button colorScheme='whatsapp' size="sm"mt="10px" onClick={onOpen} variant="ghost">
          Don't have an account? Register!
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          initialFocusRef={firstField}
          onClose={onClose}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth='1px'>
              Create a new account
            </DrawerHeader>

            <DrawerBody>
              <form>
                <Stack spacing='24px'>
                  <Box>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement 
                      ref={firstField}
                      color="whatsapp.600"
                      children={<MdOutlineEmail/>}
                      />  
                      <Input colorScheme="whatsapp" type="email" placeholder={"Enter your email address"} name="email" onChange={handleChange}/>
                  </InputGroup>
                  </Box>
                  <Box>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                      <InputLeftElement
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
                          <Button  size='2xl' onClick={handleShow} colorScheme="whatsapp" variant={"ghost"}>
                          {show ? <BiHide/>: <BiShow/>}
                          </Button>
                      </InputRightElement>
                  </InputGroup>
                  </Box>

                </Stack>
              </form>
            </DrawerBody>

            <DrawerFooter borderTopWidth='1px'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='whatsapp' onClick={handleSubmit} >Register</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Login;
