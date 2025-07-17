import { createSlice } from "@reduxjs/toolkit";
const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload;
        },
        removeRequests:()=>{
            return null

        }
        
    }
})

export const{addRequest,removeRequests}=requestSlice.actions;
export default requestSlice.reducer;