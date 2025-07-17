import {io} from "socket.io-client";
import { BASE_URL } from "./constants";



export const createSocketConnection=()=>{
    const baseHost = new URL(BASE_URL).hostname;
   if(location.hostname==baseHost)
   {
    return io(BASE_URL);
}
   else{
    return io("/",{path:"/api/socket.io"})
   }

}