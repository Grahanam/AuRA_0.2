import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchArtistSearch=createAsyncThunk('search/fetchArtists',async(searchquery)=>{
    
    try{
        const response=await fetch(`http://localhost:4000/artist/?q=${searchquery}`,{
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

export const fetchAlbumSearch=createAsyncThunk('search/fetchalbums',async(searchquery)=>{
    
    try{
        const response=await fetch(`http://localhost:4000/album/?q=${searchquery}`,{
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