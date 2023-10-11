import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchGenres=createAsyncThunk('genre/fetchGenres',async()=>{
    
    try{
        const response=await fetch('http://localhost:4000/genre',{
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
        const response=await fetch(`http://localhost:4000/genre/single/${id}`,{
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
        const response=await fetch(`http://localhost:4000/track/genre/${Id}`,{
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