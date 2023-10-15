import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchArtists=createAsyncThunk('artist/fetchArtists',async()=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/artist`,{
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

export const fetchSingleArtist=createAsyncThunk('artist/fetchSingleArtist',async(Id)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/artist/single/${Id}`,{
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

export const fetchArtistTrack=createAsyncThunk('artist/fetchArtistTrack',async(Id)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/track/artist/${Id}`,{
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