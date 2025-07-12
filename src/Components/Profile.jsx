
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
const Profile = () => {
  const[sucess,setSucess]=useState(false)
  const[error,setError]=useState(false)
  const[errMessage,setErrMessage]=useState("")

  const user=useSelector((store)=>store.user)
   const[fullName,setFullName]=useState(user?.fullName||"");
  const[age,setAge]=useState(user?.age||"");
  const[gender,setGender]=useState(user?.gender||" ");
  const[about,setAbout]=useState(user?.about||"");
  const[profilePhoto,setprofilePhoto]=useState(user?.profilePhoto||"");
  const dispatch=useDispatch();
  const handleEdit=async()=>{
    if(!fullName.trim()){
      setErrMessage("Full Name is required");
      setError(true);
        setTimeout(()=>{
        setError(false)
        setErrMessage("")
      },3000)
      return
    }
    try{const res=await axios.patch(BASE_URL+"/profile/edit",{fullName,age,gender,about,profilePhoto},{withCredentials:true})

    dispatch(addUser(res.data))
    setSucess(true)
    setTimeout(()=>{
      setSucess(false)
    },3000)

  }catch(err){
    setErrMessage(err?.response?.data||"Something Went Wrong")
      
    
    }
    
    
    
  }

  return (
    <>
    <div className="toast toast-top toast-start">
  {error&&<div className="alert alert-info">
    <span>{errMessage}</span>
  </div>}
  {sucess && <div className="alert alert-success">
    <span>Profile Updated successfully.</span>
  </div>}
</div>
    <div className="flex justify-center" >
      {user && (
  <div className="flex justify-center my-10">
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 h-[300px] w-[400px]">
      <legend className="fieldset-legend ml-40 font-bold text-lg">Login</legend>

      {/* Full Name Input */}
      <label className="label mt-6">Full Name</label>
      <input
        type="text"
        className="input"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      {/* Gender Radio Buttons */}
      <label className="label mt-6">Gender</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === "male"}
            onChange={(e) => setGender(e.target.value)}
            className="radio radio-primary"
          />
          Male
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === "female"}
            onChange={(e) => setGender(e.target.value)}
            className="radio checked:bg-pink-500"
          />
          Female
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="others"
            checked={gender === "others"}
            onChange={(e) =>setGender(e.target.value)}
            className="radio radio-primary"
          />
          Other
        </label>
      </div>

      {/* Age Input */}
      <label className="label mt-6">Age</label>
      <input
        type="text"
        className="input"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
       <label className="label mt-6">PhotoURL</label>
      <input
        type="text"
        className="input"
        placeholder="PhotoLink"
        value={profilePhoto}
        onChange={(e) => setprofilePhoto(e.target.value)}
      />

      {/* About Textarea */}
      <label className="label mt-6">About</label>
      <textarea
        className="textarea"
        placeholder="Tell us about yourself"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
      ></textarea>

      {/* Save Button */}
      <button className="btn btn-neutral mt-8" onClick={()=>handleEdit()}>
        Save Profile
      </button>
    </fieldset>
  </div>
)}
{user&&<div className="mt-12"><UserCard user={{fullName,age,gender,profilePhoto,about}} show={false}/></div>}

    </div>
    </>
  )
}

export default Profile