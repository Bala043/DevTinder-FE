
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import { useSelector } from 'react-redux'
const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [show,setShow]=useState(false)
  const userData = useSelector((store) => store.user);
  const fetchUser=async()=>{
    try{
       const res=await axios.get(BASE_URL+"/profile",{withCredentials:true})
       
      
    dispatch(addUser(res.data))
    if (res.data){
      setShow(true)
      navigate("/")
    }
    else{
      setShow(true)
      navigate("/login")
    }
    
    }catch(err){
      if(err?.response?.status===401){
        setShow(true)
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
        {show &&  <Outlet></Outlet>}
          </main>
        
        <Footer></Footer>
    </div>
  )
}

export default Body