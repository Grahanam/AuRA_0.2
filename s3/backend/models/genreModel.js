const mongoose=require('mongoose')

const genreSchema=new mongoose.Schema({
    title:{
        type:String
    },
    picture:{
        type:String
    }
})

module.exports=new mongoose.model('Genre',genreSchema)