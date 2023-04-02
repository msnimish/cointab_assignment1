import { Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import Form from '../components/Form'
import { backend_url } from './AllRoutes'

const Login = () => {

  return (
    <Flex w="100vw" margin="auto" bg="green.200" h="100%" >
        <Flex w="30%" m="auto" flexDirection={"column"} justifyContent={"center"} alignItems="center" bg="white" p="40px 25px" borderRadius={"30px"}>
            <Image src="../../public/cointab.png" w="100px" mb="20px"/>
            <Heading size="2xl" textAlign={"center"}>Welcome to <span style={{color:"#00D884"}}>Cointab</span></Heading>
            <Form url={`${backend_url}/user/login`} title="Login"/>
        </Flex>
    </Flex>
  )
}

export default Login