import {createSlice} from '@reduxjs/toolkit'
import { fetchArtistSearch,fetchTrackSearch,fetchAlbumSearch} from '../../actions/search/searchaction'


export const searchSlice=createSlice({
    name:'search',
    initialState:{
        artists:[],
        tracks:[],
        albums:[],
        searchquery:'',
        artistloading:false,
        artisterror:null,
        trackloading:false,
        trackerror:null,
        albumloading:false,
        albumerror:null
        
    },
    reducers:{
        getquery:(state,action)=>{
            state.searchquery=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchArtistSearch.pending,(state)=>{
            state.artistloading=true
            state.artisterror=null
        })
        .addCase(fetchArtistSearch.fulfilled,(state,action)=>{
            state.artistloading=false
            state.artists=action.payload;
        })
        .addCase(fetchArtistSearch.rejected,(state,action)=>{
            state.artistloading=false
            state.artisterror=action.error.message;
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

        .addCase(fetchAlbumSearch.pending,(state)=>{
            state.albumloading=true
            state.albumerror=null
        })
        .addCase(fetchAlbumSearch.fulfilled,(state,action)=>{
            state.albumloading=false
            state.albums=action.payload;
        })
        .addCase(fetchAlbumSearch.rejected,(state,action)=>{
            state.albumloading=false
            state.albumerror=action.error.message;
        })
    }
}
)

export const{getquery}=searchSlice.actions

export default searchSlice.reducer