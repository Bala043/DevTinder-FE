import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
  const feed=useSelector((store)=>store.feed)
  const navigate=useNavigate()
  const[Online,setOnline]=useState(false)

  
  const dispatch=useDispatch()
  const getFeed=async()=>{
try{
  const res=await axios.get(BASE_URL+"/user/feed",{withCredentials:true});
    dispatch(addFeed(res.data))
}catch(err){
  if(err.status===401){
    navigate("/login")
  }
  else if(err.code==="ERR_NETWORK"){
    setOnline(true)
   
  }
}
    

  }

  useEffect(()=>{getFeed()},[])
  if(feed===null || feed.length===0) return (<div className='flex-justify-center my-10'><h1 className='text-2xl'>{!Online?"No Users Found":"Server Or Connection Problem"}</h1></div>)
 console.log("Network Error")
  return (

   feed &&  <div className='flex justify-center mt-6'><UserCard user={feed[0]} show={true}/></div>
  )
}

export default Feed