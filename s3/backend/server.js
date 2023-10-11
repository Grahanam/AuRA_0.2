require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const app=express()
const path=require('path')
const saltedMd5=require('salted-md5')
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})
const port=process.env.PORT||4000
const url=process.env.url



const UserRoute=require('./routes/UserRoute')
const trackRoute=require('./routes/trackRoute')
const artistRoute=require('./routes/artistRoute')
const genreRoute=require('./routes/genreRoute')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

//Routers
app.use('/',UserRoute)
app.use('/track',trackRoute)
app.use('/genre',genreRoute)
app.use('/artist',artistRoute)

//starting server  
app.listen(port,()=>{
    console.log(`Listening on port:${port}`)
})



//Database
mongoose.connect(url)
const db=mongoose.connection
db.on('error',(error)=>{
    console.error('MongoDB connection error:',error)
})
db.once('open',()=>{
    console.log('Connected to MongoDB')
})