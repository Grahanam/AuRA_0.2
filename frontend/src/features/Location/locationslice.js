import { createSlice } from "@reduxjs/toolkit";



export const locationSlice=createSlice({
    name:"location",
    initialState:{
        location:[]
    },
    reducers:{
        getlocation:(state,action)=>{
               
               state.location=action.payload
        }
    }
})

export const{getlocation}=locationSlice.actions

export default locationSlice.reducer