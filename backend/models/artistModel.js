const mongoose=require('mongoose')

const artistSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    picture:{
        url:{
            type:String,
        },
        filepath:{
            type:String,
        }
    },
    type:{
        type:String,
        default:'artist'
    }
    
})

module.exports=mongoose.model('Artist',artistSchema)