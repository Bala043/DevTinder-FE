
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import {Provider} from 'react-redux'
import appStore from "./utils/appStore"
import Feed from "./Components/Feed"
import Body from "./Components/Body"
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"
import Premium from "./Components/Premium"
import Chat from "./Components/Chat"
function App() {
  return (
   <>
   <Provider store={appStore}>
  <BrowserRouter basename="/">
  <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/" element={<Feed/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/connections" element={<Connections/>}></Route>
    <Route path="/requests" element={<Requests/>}></Route>
    <Route path="/premium" element={<Premium/>}></Route>
    <Route path="chat/:id" element={<Chat/>}></Route>
    </Route>
  </Routes>
  </BrowserRouter>
  </Provider>
   </>
     
  )
}

export default App
