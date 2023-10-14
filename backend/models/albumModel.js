const mongoose=require('mongoose')


const albumSchema=new mongoose.Schema({
    name:{
        type:String
    },
    album_type:{
        type:String
    },
    artists:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Artist'
        }
    ],
    total_tracks:{
        type:Number
    },
    picture:{
        url:{
            type:String
        },
        filepath:{
            type:String
        }
    },
    tracks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Track'
        }
    ],
    genres:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Genre'
        }
    ],
    type:{
        type:String,
        default:'album'
    }
})

module.exports=mongoose.model('Album',albumSchema)