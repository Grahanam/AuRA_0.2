const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const path=require('path')

const multer = require('multer');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const trackModel=require('../models/trackModel')

//firebase 
const UUID = require("uuid-v4");
const bucket=require('../firebaseadmin')
const admin=require('firebase-admin')
const uploadFile=require('../firebasestorage/upload')



//Create Artist
router.post('/',upload.fields([
    {name:'picture',maxCount:1},
    {name:'audio',maxCount:1},
]),async(req,res)=>{
    try{
        // console.log(req.body)
        const file = req.files;
        const picture=file.picture[0]
        const audio=file.audio[0]

        let picturefileName = `aura/track_img/${Date.now()}_${picture.originalname}`;
        let audiofileName=`aura/track_audio/${Date.now()}_${audio.originalname}`;

        const picuuid=UUID()
        const auduuid=UUID()

        const pictureurl=await uploadFile(picture.buffer, picturefileName, picture.mimetype,picuuid);
        
        const audiourl=await uploadFile(audio.buffer, audiofileName, audio.mimetype,auduuid);
        
        const track=new trackModel({
            name:req.body.name,
            picture:{
                url:pictureurl,
                filepath:picturefileName
            },
            audio:{
              url:audiourl,
              filepath:audiofileName,
            },
            duration:req.body.duration,
            artist:[
              "6528df393397afda498007e3"
            ],
            genre:[
              "6528caa27448ac46aaedfbfe"
            ],
            album:req.body.album,
            track_number:req.body.track_number
            
            // artist:req.body.artist,
            // genre:req.body.genre
        })
        

        await track.save()
        res.status(200).json({message:'Track Saved successfully'})
  
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.put('/update',upload.fields([
    {name:'picture',maxCount:1},
    {name:'audio',maxCount:1},
]),async(req,res)=>{
       try{
          // console.log(req.body)
          
          if(!req.file){
            const track=await trackModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
            
          }else{
            
            const track=await trackModel.findById(req.body.id)
            if(req.files.picture[0]){

                await bucket.file(track.picture.filepath).delete()
            
                console.log('deleted successfully')
                const picture=req.files.picture[0]
                const filename = `aura/track_img/${Date.now()}_${picture.originalname}`;
                const uuid=UUID()
                const fileURL = await uploadFile(picture.buffer,filename,picture.mimetype,uuid);
                
                track.picture={
                  url:fileURL,
                  filepath:filename
                }
            }
            if(req.files.audio[0]){
                await bucket.file(track.audio.filepath).delete()
               
                const audio=req.files.audio[0]
                const filename = `aura/track_audio/${Date.now()}_${audio.originalname}`;
                const uuid=UUID()
                const fileURL = await uploadFile(audio.buffer,filename,audio.mimetype,uuid);
                track.audio={
                  url:fileURL,
                  filepath:filename
                }
            }
            track.duration=req.body.duration
            track.artist=req.body.artist
            track.genre=req.body.genre
            const updatetrack=await trackModel.findByIdAndUpdate(track._id,track,{new:true})
          }
          res.status(200).json({message:'Track Updated Successfully'})
       }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
       }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
      // console.log(req.params.id)
      //find genre in database using id
      const track=await trackModel.findById(req.params.id)
      
      await bucket.file(track.picturepath).delete()
      await bucket.file(track.audiopath).delete()

      console.log('deleted successfully')
      //delete genre in database
      const trackdelete=await trackModel.findByIdAndDelete(track._id)    
      res.status(200).json('Track deleted successfully')
      
  }catch(err){
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})

router.get('/',async(req,res)=>{
    try{
        let query=null
        if(req.query.q){
           query={name:{$regex:req.query.q,$options:'i'}}
        }
        const track=await trackModel.find(query).populate('artist').limit(4)
        
        res.status(200).json({data:track,message:'success'})
    }catch(err){
        console.log(err)
        res.status(500).json({data:err,message:'Internal Server Error!'})
    }
})

router.get('/getqueue/:id',async(req,res)=>{
    try{
        
        const Id=req.params.id
        const track=await trackModel.findById(Id).populate('genre')
       
    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    const genreIds = track.genre.map((genre) => genre._id);
  

    const similarTracks = await trackModel.aggregate([
      {
        $match: {
          _id: { $ne:new mongoose.Types.ObjectId(Id) }, // Exclude the specified track
          genre: { $in: genreIds }, // Find tracks with at least one matching genre
        },
      },
      { $sample: { size: 10 } },
    ])

    res.status(200).json({ data:similarTracks,message:'success' });
    }catch(err){
        console.log(err);
        res.status(500).json({ error:err,message: 'Internal Server Error' });
    }
})

router.get('/artist/:id', async (req, res) => {
  try {
    const artistId = req.params.id;
    const tracks = await trackModel.find({ artist:{$in:artistId} });
    res.status(200).json({ data: tracks });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/genre/:id', async (req, res) => {
  try {
    const genreId = req.params.id;
    const tracks = await trackModel.find({ genre:{$in:genreId} });
    res.status(200).json({ data: tracks });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/single/:id',async(req,res)=>{
  try{
      
      const track=await trackModel.findById(req.params.id)
      res.status(200).json({data:track,message:'success'})
      
  }catch(err){
    // console.log(err)
    res.status(500).json({data:err,message:'Internal Server Error'})
  }
})

module.exports=router