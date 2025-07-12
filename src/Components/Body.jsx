
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=>{
    try{
       const res=await axios.get(BASE_URL+"/profile",{withCredentials:true})
      
    dispatch(addUser(res.data))
    navigate("/")
    }catch(err){
      if(err.status===401){
        navigate("/login")
      }
      
    }
  }
  useEffect(()=>{
    fetchUser()

  },[])
  return (
    <div>
        <NavBar/>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Body