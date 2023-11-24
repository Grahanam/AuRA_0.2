import {createSlice} from '@reduxjs/toolkit'
import { fetchAlbums, fetchSingleAlbum } from '../../actions/album/albumaction'

export const albumSlice=createSlice({
    name:'album',
    initialState:{
        albums:[],
        albumsloading:false,
        albumserror:null,
        album:{},
        singleloading:false,
        singleerror:null
    },
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAlbums.pending,(state)=>{
            state.albumsloading=true
            state.albumserror=null
        })
        .addCase(fetchAlbums.fulfilled,(state,action)=>{
            state.albumsloading=false
            state.albums=action.payload;
        })
        .addCase(fetchAlbums.rejected,(state,action)=>{
            state.albumsloading=false
            state.albumserror=action.error.message;
        })

        .addCase(fetchSingleAlbum.pending,(state)=>{
            state.singleloading=true
            state.singleerror=null
        })
        .addCase(fetchSingleAlbum.fulfilled,(state,action)=>{
            state.singleloading=false

            state.album=action.payload;
        })
        .addCase(fetchSingleAlbum.rejected,(state,action)=>{
            state.singleloading=false
            state.singleerror=action.error.message;
        })
    }
}
)

export  const{getartist}=albumSlice.actions

export default albumSlice.reducer