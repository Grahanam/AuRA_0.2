import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchPlaylist=createAsyncThunk('playlist/fetchPlaylist',async(userId)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/playlist/${userId}`,{
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

export const fetchSinglePlaylist=createAsyncThunk('playlist/fetchSinglePlaylist',async(Id)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/playlist/single/${Id}`,{
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

export const savePlaylist=createAsyncThunk('playlist/savePlaylist',async(data)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/playlist`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({title:data.title,user:data.user})
        })
        const getdata=await response.json()
        return getdata
    }catch(err){
        throw err
    }
})

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

export const trackadd=createAsyncThunk('playlist/trackadd',async(data)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/playlist/add/${data.id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({track:data.track})
        })
        const data=await response.json()
        return data
    }catch(err){
        throw err
    }
})

export const trackremove=createAsyncThunk('playlist/trackremove',async(data)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/playlist/remove/${data.id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({track:data.track})
        })
        const data=await response.json()
        return data
    }catch(err){
        throw err
    }
})

