const mongoose=require('mongoose')

const trackSchema=new mongoose.Schema({
    name:{
        type:String
    },
    picture:{
        type:String
    },
    picturepath:{
        type:String
    },
    audio:{
        type:String
    },
    audiopath:{
        type:String
    },
    duration:{
        type:Number
    },
    artist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Artist'
        }
    ],
    genre:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Genre'
        }
    ]
})

module.exports=mongoose.model('Track',trackSchema)