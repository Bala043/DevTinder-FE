import React, { useEffect } from 'react'
import axios from 'axios'
import { addRequest } from '../utils/requestSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'

const Requests = () => {
const dispatch=useDispatch()
const requests=useSelector((store)=>store.request)

    const fetchRequests=async()=>{
        const res=await axios.get(BASE_URL+"/user/request/received",{withCredentials:true})
        
        dispatch(addRequest(res.data.data))
    }
    const handleRequest=async(status,_id)=>{

        const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
        if(res.status===200){
            fetchRequests()
        }

    }
    useEffect(()=>{
        if(requests!==null) return
fetchRequests()
    },[])
    if (requests===null) return
    if (requests.length===0){
        return (<div><h1>No Requests Received</h1></div>)
    }
    return (
  requests && (
    <div>
        <h1 className="text-center"> Connections</h1>
      {requests.map((request) => {
        const { fullName, profilePhoto, age, gender, about,_id } = request.fromUserId;

        return (
          <div
            key={_id}
            className="card card-side bg-blue-500 shadow-xl max-w-3xl mx-auto p-2 my-2"
          >
            {/* Left - Image */}
            <figure>
              <img
                src={profilePhoto}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover"
              />
            </figure>

            {/* Middle - Info */}
            <div className="flex flex-col justify-center px-6 space-y-1 flex-1">
              <h2 className="card-title">{fullName}</h2>
              <p>Age: {age || "Not Mentioned"}</p>
              <p>About: {about || "No description available"}</p>
              <p>Gender: {gender || "Not Mentioned"}</p>
            </div>

            {/* Right - Buttons */}
            <div className="flex flex-col justify-center space-y-2">
              <button className="btn btn-success" onClick={()=>handleRequest("accepted",_id)}>Accept</button>
              <button className="btn btn-error" onClick={()=>handleRequest("rejected",_id)}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  )
);
}
  
    
     

export default Requests