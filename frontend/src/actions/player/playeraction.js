import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchQueue=createAsyncThunk('player/fetchQueue',async(Id)=>{
    try{
        const response=await fetch(`http://localhost:4000/track/getqueue/${Id}`,{
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