import { createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL=import.meta.env.VITE_BASE_URL

export const fetchGenres=createAsyncThunk('genre/fetchGenres',async()=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/genre`,{
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

export const fetchSingleGenre=createAsyncThunk('genre/fetchSingleGenre',async(id)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/genre/single/${id}`,{
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

export const fetchGenreTrack=createAsyncThunk('genre/fetchGenreTrack',async(Id)=>{
    
    try{
        const response=await fetch(`${API_BASE_URL}/track/genre/${Id}`,{
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