const mongoose=require('mongoose')

const genreSchema=new mongoose.Schema({
    title:{
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
        default:'genre'
    }
})

module.exports=new mongoose.model('Genre',genreSchema)