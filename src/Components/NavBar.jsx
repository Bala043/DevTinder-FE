import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { removeUser } from '../utils/userSlice'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { clearFeed } from '../utils/feedSlice'
import { removeRequests } from '../utils/requestSlice'
import { clearConnections } from '../utils/connectionsSlice'

const NavBar = () => {
  const userInfo = useSelector((store) => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    const res = await axios.post(BASE_URL + "/logout", null, { withCredentials: true })
    if (res.status === 200) {
      dispatch(removeUser())
      dispatch(clearFeed())
      dispatch(removeRequests())
      dispatch(clearConnections())
      navigate("/login")
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          Tinder-Clone
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {userInfo && (
          <>
            <h5 className="text-sm font-medium hidden sm:inline truncate max-w-[100px]">{userInfo.fullName}</h5>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-105 transition">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User Avatar" src={userInfo.profilePhoto} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52"
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
                  <Link to="/premium" className="justify-between">
                    Premium
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
