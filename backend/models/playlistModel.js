const mongoose=require('mongoose')

const playlistSchema=new mongoose.Schema({
    title:{
        type:String
    },
    picture:{
        type:String
    },
    filepath:{
        type:String
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
    ]
})

module.exports=mongoose.model('Playlist',playlistSchema)