const mongoose=require('mongoose')

const artistSchema=new mongoose.Schema({
    name:{
        type:String,

    },
    picture:{
        type:String,

    }
})

module.exports=mongoose.model('Artist',artistSchema)