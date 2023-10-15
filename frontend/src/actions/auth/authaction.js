import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from 'universal-cookie'
const API_BASE_URL=import.meta.env.VITE_BASE_URL



export const googleAuth=createAsyncThunk('auth/googleAuth',async(token)=>{
    const cookie=new Cookie
    try{
        const response=await fetch(`${API_BASE_URL}/googletoken`,{
            method:'POST',
            headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
            },
            body:JSON.stringify({token})
        })
        const data=await response.json()
        console.log(data)
        
        return data.data
    }catch(err){
        throw err
    }
})