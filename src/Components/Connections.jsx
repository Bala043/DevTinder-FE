import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'
import { BASE_URL } from '../utils/constants'

const Connections = () => {
    const dispatch=useDispatch()
    const connections=useSelector((store)=>store.connections)
     const fetchConnections=async()=>{
        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
         dispatch(addConnections(res.data.data))

    }
    useEffect(()=>{
      if(connections!==null) return
        fetchConnections()
    },[])
    if(connections===null)return
    if(connections.length===0){
        return(<div><h1 className="text-center">No Connections</h1></div>)
    }
    return (
        <div>
            {connections.map((connection)=>{
                const{fullName,age,profilePhoto,gender,about,_id}=connection
                
                return(
                <div key={_id} className="card card-side bg-blue-500 shadow-xl max-w-3xl mx-auto p-2 my-2">
      {/* Left - Image */}
      <figure>
        <img
          src={profilePhoto || "https://randomuser.me/api/portraits/lego/1.jpg"}
          alt="Profile"
          className="rounded-full w-20 h-20 object-cover"
        />
      </figure>

      {/* Middle - Info */}
      <div className="flex flex-col justify-center px-6 space-y-1 flex-1 text-white">
        <h2 className="card-title text-lg font-semibold">{fullName}</h2>
        <p className="text-sm">Age: {age || "Not Mentioned"}</p>
        <p className="text-sm">About: {about || "No description available"}</p>
        <p className="text-sm">Gender: {gender || "Not Mentioned"}</p>
      </div>

      {/* Right - Button */}
      <div className="flex flex-col justify-center space-y-2">
        <button
          className="btn btn-error btn-sm"
          
        >
          Remove
        </button>
      </div>
    </div>
            )})}
    
    </div>)
}

export default Connections