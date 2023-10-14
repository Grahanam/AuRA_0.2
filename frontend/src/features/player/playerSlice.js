import { createSlice } from "@reduxjs/toolkit";
import { fetchQueue } from "../../actions/player/playeraction";


export const playerSlice=createSlice({
    name:"player",
    initialState:{
        track:{},
        playlist:[],
        queue:[],
        currenttrack:0,
        queueloading:false,
        queueerror:null
    },
    reducers:{
        loadmusic:(state,action)=>{
            // state.track=action.payload
            // state.playlist=state.queue
            state.playlist.push(action.payload)
            state.currenttrack=0
            state.track=state.playlist[state.currenttrack]
            
        },
        loadplaylist:(state,action)=>{
            state.playlist=action.payload
            state.currenttrack=0
            state.track=state.playlist[state.currenttrack]
        },
        handlenext:(state)=>{
            state.currenttrack<state.playlist.length-1?state.currenttrack+=1:state.currenttrack=0
            state.track=state.playlist[state.currenttrack]
        },
        handleprevious:()=>{
            state.currenttrack==0?state.currenttrack=state.playlist.length-1:state.currenttrack-=1
            state.track=state.playlist[state.currenttrack]
        },
        handleEnd:()=>{
            state.currenttrack<playlist.length-1?state.currenttrack+=1:state.currenttrack=0
            state.track=state.playlist[state.currenttrack]
        }
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchQueue.pending,(state)=>{
            state.queueloading=true
            state.queueerror=null
        })
        .addCase(fetchQueue.fulfilled,(state,action)=>{
            state.queueloading=false
            state.queue=action.payload;
        })
        .addCase(fetchQueue.rejected,(state,action)=>{
            state.queueloading=false
            state.queueerror=action.error.message;
        })

        

    }
})

export const{loadmusic,loadplaylist,handlenext,handleprevious,handleEnd}=playerSlice.actions

export default playerSlice.reducer