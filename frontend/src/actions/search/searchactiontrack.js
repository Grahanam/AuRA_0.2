import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchTrackSearch=createAsyncThunk('search/fetchtracks',async(searchquery)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/track/?q=${searchquery}`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        return data.data
    }catch(err){
        throw err
    }
})