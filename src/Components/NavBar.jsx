import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
const NavBar = () => {
  const userInfo=useSelector((store)=>store.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogout=async()=>{
    
    const res=await axios.post(BASE_URL+"/logout",null,{withCredentials:true})
    if(res.status===200){
      dispatch(removeUser())
      navigate("/login")
    }
   
  }
  return (
   <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to="/"><p className="btn btn-ghost text-xl">Tinder-Clone</p></Link>
  </div>
  <div className="flex gap-2">
    {userInfo && (
      <>
        <h5>{userInfo.fullName}</h5>
        <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={userInfo.profilePhoto}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                
              </Link>
            </li>
              <li>
              <Link to="/connections" className="justify-between">
              Connections
                
              </Link>
            </li>
              <li>
              <Link to="/requests" className="justify-between">
                Requests
                
              </Link>
            </li>
           
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </>
    )}
  </div>
</div>

  )
}

export default NavBar