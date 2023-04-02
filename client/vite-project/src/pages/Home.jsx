import React, { useEffect, useState } from 'react'
import { Flex, Card, CardHeader, CardBody, CardFooter, Heading, Button, Text, Avatar, Icon, ListIcon, ListItem, List } from '@chakra-ui/react'
import axios from 'axios'
import { AiOutlineUser } from "react-icons/ai"
import { backend_url } from './AllRoutes'
import { useNavigate } from 'react-router-dom'
import { MdOutlineEmail } from "react-icons/md";

const Home = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    let getData = async()=>{
        let res = await axios.get(`${backend_url}/user/getUser`,{
            headers:{
                authorization: localStorage.getItem("cointab-token")
            }
        })
        setUserData(res.data.user);
        console.log(userData);
    }

    let handleClick = () => {
        localStorage.removeItem("cointab-token");
        navigate("/")
    }

    useEffect(()=>{
        const fetchData = async() => {
            await getData()
        }
        fetchData();
    },[])
  return (
    <Flex w="100vw" h="100vh" bg="whatsapp.50" >
        <Flex m="auto" justifyContent={"center"} alignItems="center">
            <Card align='center' flexDirection={"column"} p="20px" borderRadius={"30px"}>
                <CardHeader>
                    <Avatar bg="whatsapp.500"icon={<AiOutlineUser fontSize='5rem' /> } size="2xl"/>
                </CardHeader>
                <Flex flexDirection={"row"}>
                <CardBody display="flex" textAlign={"center"} color="whatsapp.500" flexDirection={"row"} alignItems="center" gap="5px">
                    {/* <Icon as={MdOutlineEmail} w="30px" h="30px" />
                    <Heading size="md">{userData?.email}</Heading> */}
                    <List>
                    <ListItem fontWeight={700}>
                        <ListIcon as={MdOutlineEmail} color='green.500' />
                        {userData?.email}
                    </ListItem>
                    </List>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='whatsapp' onClick={handleClick}>Logout</Button>
                </CardFooter>
                </Flex>
            </Card>
        </Flex>
    </Flex>
  )
}

export default Home