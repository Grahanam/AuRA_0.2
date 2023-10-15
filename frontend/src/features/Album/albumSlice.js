import {createSlice} from '@reduxjs/toolkit'
import { fetchAlbums, fetchSingleAlbum } from '../../actions/album/albumaction'

export const albumSlice=createSlice({
    name:'album',
    initialState:{
        albums:[],
        albumloading:false,
        albumerror:null,
        album:{},
        singleloading:false,
        singleerror:null
    },
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAlbums.pending,(state)=>{
            state.albumloading=true
            state.albumerror=null
        })
        .addCase(fetchAlbums.fulfilled,(state,action)=>{
            state.albumloading=false
            state.albums=action.payload;
        })
        .addCase(fetchAlbums.rejected,(state,action)=>{
            state.albumloading=false
            state.albumerror=action.error.message;
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