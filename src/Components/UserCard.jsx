import axios from 'axios'

 import { useDispatch } from 'react-redux'
import { removeFeed } from '../utils/feedSlice'
import { BASE_URL } from '../utils/constants'

const UserCard = ({user,show}) => {
  


  
  const dispatch=useDispatch()
  const handleReview=async(status,_id)=>{
    
    const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+_id,{},{withCredentials:true})
   
    dispatch(removeFeed(user._id))
   

  }
  
 
  return  (
    <div className="card mt-0 bg-base-300 w-96 shadow-sm">
  <figure>
    <img className="w-[400px] h-[400px]"
      src={user.profilePhoto||null}
      alt="profile"/>
  </figure>
  <div className="card-body">
    <h2 className="card-title">{user.fullName}</h2>
    <p>{user.age&&user.gender &&user.age+" "+user.gender}</p>
    <p>{user.about}</p>
   {show && <div className="card-actions justify-center my-4">
        <button className="btn btn-primary"onClick={()=>handleReview("ignored",user._id)}>Ignore </button>
      <button className="btn btn-secondary" onClick={()=>handleReview("interested",user._id)}>Interested</button>
    </div>}
  </div>
</div>
  )
}

export default UserCard