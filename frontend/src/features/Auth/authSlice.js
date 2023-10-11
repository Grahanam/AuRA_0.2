import { createSlice } from "@reduxjs/toolkit";
import { googleAuth } from "../../actions/auth/authaction";
import Cookie from 'universal-cookie'

const cookie=new Cookie


export const authSlice=createSlice({
    name:'auth',
    initialState:{
        token:null,
        loading:false,
        error:null
    },
    reducers:{
         logout:(state)=>{
            state.token=null
            cookie.remove("TOKEN",{
                path:"/",
            })
            cookie.remove("TSTAMP",{
                path:"/",
            })
            cookie.remove("GID",{
                path:"/",
            }),
            cookie.remove("MID",{
                path:"/",
            }),
            cookie.remove("NAME",{
                path:"/",
            }),
            cookie.remove("PIC",{
                path:"/",
            })
            cookie.remove("UID",{
                path:"/",
            })

         },
         checkcookies:(state)=>{
            if(cookie.get("TOKEN",{
                path:"/",
            })){
            const token={
                token:cookie.get("TOKEN",{
                    path:"/",
                }),
                timestamp:cookie.get("TSTAMP",{
                    path:"/",
                }),
                userid:cookie.get("UID",{
                    path:"/",
                }),
                googleid:cookie.get("GID",{
                    path:"/",
                }),
                mailid:cookie.get("MID",{
                    path:"/",
                }),
                fullname:cookie.get("NAME",{
                    path:"/",
                }),
                picture:cookie.get("PIC",{
                    path:"/",
                })
               }
               const currenttime=Date.now()/1000
               if(currenttime>token.timestamp){
                state.token=null
                cookie.remove("TOKEN",{
                    path:"/",
                })
                cookie.remove("TSTAMP",{
                    path:"/",
                })
                cookie.remove("UID",{
                    path:"/",
                })
                cookie.remove("GID",{
                    path:"/",
                }),
                cookie.remove("MID",{
                    path:"/",
                }),
                cookie.remove("NAME",{
                    path:"/",
                }),
                cookie.remove("PIC",{
                    path:"/",
                })
               }else{
                    state.token=token
               }

            }
       
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(googleAuth.pending,(state)=>{
              state.loading=true
              state.error=null
        })
        .addCase(googleAuth.fulfilled,(state,action)=>{
              state.token=action.payload
              state.loading=false
              console.log(action.payload)
              cookie.set("TOKEN",action.payload.token,{
                path:"/",
            })
            cookie.set("TSTAMP",action.payload.timestamp,{
                path:"/",
            })
            cookie.set("UID",action.payload.userid,{
                path:"/",
            })
            cookie.set("GID",action.payload.googleid,{
                path:"/",
            })
            cookie.set("MID",action.payload.mailid,{
                path:"/",
            })
            cookie.set("NAME",action.payload.fullname,{
                path:"/",
            })
            cookie.set("PIC",action.payload.picture,{
                path:"/",
            })
        })
        .addCase(googleAuth.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})


export const{logout,checkcookies,checkTokenstamp}=authSlice.actions

export default authSlice.reducer