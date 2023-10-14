const mongoose=require('mongoose')

const playlistSchema=new mongoose.Schema({
    title:{
        type:String
    },
    picture:{
        url:{
            type:String
        },
        filepath:{
            type:String
        }, 
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    tracks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Track'
        }
    ],
    type:{
        type:String,
        default:'playlist'
    }
})

module.exports=mongoose.model('Playlist',playlistSchema)