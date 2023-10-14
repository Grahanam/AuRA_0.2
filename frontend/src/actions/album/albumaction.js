import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchAlbums=createAsyncThunk('artist/fetchArtists',async()=>{
    
    try{
        const response=await fetch('http://localhost:4000/album',{
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
        const response=await fetch(`http://localhost:4000/album/single/${Id}`,{
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

