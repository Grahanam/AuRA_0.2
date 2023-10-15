import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchQueue=createAsyncThunk('player/fetchQueue',async(Id)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/track/getqueue/${Id}`,{
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