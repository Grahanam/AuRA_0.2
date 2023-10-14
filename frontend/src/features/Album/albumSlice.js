import {createSlice} from '@reduxjs/toolkit'
import { fetchAlbums, fetchSingleAlbum } from '../../actions/album/albumaction'

export const albumSlice=createSlice({
    name:'album',
    initialState:{
        albums:[],
        loading:false,
        error:null,
        album:{},
        singleloading:false,
        singleerror:null
    },
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAlbums.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchAlbums.fulfilled,(state,action)=>{
            state.loading=false
            state.albums=action.payload;
        })
        .addCase(fetchAlbums.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message;
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