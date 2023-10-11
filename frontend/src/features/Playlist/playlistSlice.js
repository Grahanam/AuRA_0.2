import {createSlice} from '@reduxjs/toolkit'
import { fetchPlaylist,fetchTrackSearch,fetchSinglePlaylist, savePlaylist} from '../../actions/playlist/playlistaction'


export const playlistSlice=createSlice({
    name:'playlist',
    initialState:{
        playlist:{},
        playlistloading:false,
        playlisterror:null,
        playlists:[],
        loading:false,
        error:null,
        search:'',
        trackloading:false,
        trackerror:null,
        tracks:[],
        saveloading:false,
        saveerror:null 
    },
    reducers:{
        getquery:(state,action)=>{
            state.search=action.payload
        },
        
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSinglePlaylist.pending,(state)=>{
            state.playlistloading=true
            state.playlisterror=null
        })
        .addCase(fetchSinglePlaylist.fulfilled,(state,action)=>{
            state.playlistloading=false
            state.playlist=action.payload;
        })
        .addCase(fetchSinglePlaylist.rejected,(state,action)=>{
            state.playlistloading=false
            state.playlisterror=action.error.message;
        })

        .addCase(fetchPlaylist.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchPlaylist.fulfilled,(state,action)=>{
            state.loading=false
            state.playlists=action.payload;
        })
        .addCase(fetchPlaylist.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message;
        })

        .addCase(fetchTrackSearch.pending,(state)=>{
            state.trackloading=true
            state.trackerror=null
        })
        .addCase(fetchTrackSearch.fulfilled,(state,action)=>{
            state.trackloading=false
            state.tracks=action.payload;
        })
        .addCase(fetchTrackSearch.rejected,(state,action)=>{
            state.trackloading=false
            state.trackerror=action.error.message;
        })

        .addCase(savePlaylist.pending,(state)=>{
            state.saveloading=true
            state.saveerror=null
        })
        .addCase(savePlaylist.fulfilled,(state,action)=>{
            state.saveloading=false
            // state.tracks=action.payload;
        })
        .addCase(savePlaylist.rejected,(state,action)=>{
            state.saveloading=false
            state.saveerror=action.error.message;
        })
    }
}
)

export const{getquery}=playlistSlice.actions

export default playlistSlice.reducer