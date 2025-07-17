
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import { useSelector } from 'react-redux'
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser=async()=>{
    try{
       const res=await axios.get(BASE_URL+"/profile",{withCredentials:true})
       console.log(res.data)
      
    dispatch(addUser(res.data))
    if (res.data){navigate("/")}
    else{
      navigate("/login")
    }
    
    }catch(err){
      if(err?.response?.status===401){
        navigate("/login")
      }
      
    }
  }
  useEffect(()=>{
    if(userData) return
    fetchUser()

  },[])
  return (
    <div className="min-h-screen flex flex-col">
        <NavBar/>
        <main className="flex-grow">
          <Outlet></Outlet>
          </main>
        
        <Footer></Footer>
    </div>
  )
}

export default Body