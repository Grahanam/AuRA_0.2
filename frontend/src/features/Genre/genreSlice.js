import {createSlice} from '@reduxjs/toolkit'
import { fetchGenreTrack, fetchGenres, fetchSingleGenre } from '../../actions/genre/genreaction'

export const genreSlice=createSlice({
    name:'genre',
    initialState:{
        genres:[],
        genre:{},
        genresloading:false,
        genreserror:null,
        singleloading:false,
        singleerror:false,
        tracks:[],
        tracksloading:false,
        trackserror:null
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
        .addCase(fetchGenres.pending,(state)=>{
            state.genresloading=true
            state.genreserror=null
        })
        .addCase(fetchGenres.fulfilled,(state,action)=>{
            state.genresloading=false
            state.genres=action.payload;
        })
        .addCase(fetchGenres.rejected,(state,action)=>{
            state.genresloading=false
            state.genreserror=action.error.message;
        })

        .addCase(fetchSingleGenre.pending,(state)=>{
            state.singleloading=true
            state.singleerror=null
        })
        .addCase(fetchSingleGenre.fulfilled,(state,action)=>{
            state.singleloading=false
            state.genre=action.payload;
        })
        .addCase(fetchSingleGenre.rejected,(state,action)=>{
            state.singleloading=false
            state.singleerror=action.error.message;
        })

        .addCase(fetchGenreTrack.pending,(state)=>{
            state.tracksloading=true
            state.trackserror=null
        })
        .addCase(fetchGenreTrack.fulfilled,(state,action)=>{
            state.tracksloading=false
            state.tracks=action.payload;
        })
        .addCase(fetchGenreTrack.rejected,(state,action)=>{
            state.tracksloading=false
            state.trackserror=action.error.message;
        })
    }
}
)

export const{getartist}=genreSlice.actions

export default genreSlice.reducer