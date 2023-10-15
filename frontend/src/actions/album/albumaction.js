import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchAlbums=createAsyncThunk('album/fetchAlbumss',async()=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/album`,{
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

export const fetchSingleAlbum=createAsyncThunk('album/fetchSingleAlbum',async(Id)=>{
    try{
        const response=await fetch(`${API_BASE_URL}/album/single/${Id}`,{
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

