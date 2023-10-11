import {createSlice} from '@reduxjs/toolkit'
import { fetchArtistTrack, fetchArtists, fetchSingleArtist } from '../../actions/artist/artistaction'

export const artistSlice=createSlice({
    name:'artist',
    initialState:{
        artists:[],
        tracks:[],
        tracksloading:false,
        trackserror:null,
        loading:false,
        error:null,
        artist:{},
        singleloading:false,
        singleerror:null
    },
    reducers:{
        getartist:(state,action)=>{
            fetch('http://localhost:4000/artist',{
                method:'GET',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            }).then(response=>response.json())
            .then((response)=>{
               console.log(response)
               state.artists.push(response.data)
            })
            .catch((err)=>{
               console.log(err)
            })
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchArtists.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchArtists.fulfilled,(state,action)=>{
            state.loading=false
            state.artists=action.payload;
        })
        .addCase(fetchArtists.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message;
        })

        .addCase(fetchSingleArtist.pending,(state)=>{
            state.singleloading=true
            state.singleerror=null
        })
        .addCase(fetchSingleArtist.fulfilled,(state,action)=>{
            state.singleloading=false
            state.artist=action.payload;
        })
        .addCase(fetchSingleArtist.rejected,(state,action)=>{
            state.singleloading=false
            state.singleerror=action.error.message;
        })

        .addCase(fetchArtistTrack.pending,(state)=>{
            state.tracksloading=true
            state.trackserror=null
        })
        .addCase(fetchArtistTrack.fulfilled,(state,action)=>{
            state.tracksloading=false
            state.tracks=action.payload
        })
        .addCase(fetchArtistTrack.rejected,(state,action)=>{
            state.tracksloading=false
            state.trackserror=action.error.message
        })
    }
}
)

export const{getartist}=artistSlice.actions

export default artistSlice.reducer