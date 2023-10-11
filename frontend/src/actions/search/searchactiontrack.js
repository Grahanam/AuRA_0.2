import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTrackSearch=createAsyncThunk('search/fetchtracks',async(searchquery)=>{
    
    try{
        const response=await fetch(`http://localhost:4000/track/?q=${searchquery}`,{
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