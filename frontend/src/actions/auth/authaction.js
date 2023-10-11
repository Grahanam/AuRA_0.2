import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookie from 'universal-cookie'




export const googleAuth=createAsyncThunk('auth/googleAuth',async(token)=>{
    const cookie=new Cookie
    try{
        const response=await fetch('http://localhost:4000/googletoken',{
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