import {createSlice} from '@reduxjs/toolkit'
import { fetchTracks } from '../../actions/track/trackaction'

export const trackSlice=createSlice({
    name:'track',
    initialState:{
        tracks:[],
        tracksloading:false,
        trackserror:null,
        // tracks:[],
        // loading:false,
        // error:null,
        // artist:{},
        // singleloading:false,
        // singleerror:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTracks.pending,(state)=>{
            state.tracksloading=true
            state.trackserror=null
        })
        .addCase(fetchTracks.fulfilled,(state,action)=>{
            state.tracksloading=false
            state.tracks=action.payload;
        })
        .addCase(fetchTracks.rejected,(state,action)=>{
            state.tracksloading=false
            state.trackserror=action.error.message;
        })

        // .addCase(fetchSingleArtist.pending,(state)=>{
        //     state.singleloading=true
        //     state.singleerror=null
        // })
        // .addCase(fetchSingleArtist.fulfilled,(state,action)=>{
        //     state.singleloading=false
        //     state.artist=action.payload;
        // })
        // .addCase(fetchSingleArtist.rejected,(state,action)=>{
        //     state.singleloading=false
        //     state.singleerror=action.error.message;
        // })

        // .addCase(fetchArtistTrack.pending,(state)=>{
        //     state.tracksloading=true
        //     state.trackserror=null
        // })
        // .addCase(fetchArtistTrack.fulfilled,(state,action)=>{
        //     state.tracksloading=false
        //     state.tracks=action.payload
        // })
        // .addCase(fetchArtistTrack.rejected,(state,action)=>{
        //     state.tracksloading=false
        //     state.trackserror=action.error.message
        // })
    }
}
)

export const{}=trackSlice.actions

export default trackSlice.reducer