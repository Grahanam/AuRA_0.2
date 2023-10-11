const express=require('express')

const router=express.Router()
const path=require('path')

const multer = require('multer');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const trackModel=require('../models/trackModel')



const s3=require('../s3/s3')
const deletefile=require('../s3/deletes3')
const uploadfile=require('../s3/uploads3')

const generateFileName=require('../s3/generateFileName')

const bucketName = process.env.S3_BUCKET;
const bucketRegion = process.env.S3_REGION;


//Create Artist
router.post('/',upload.fields([
    {name:'picture',maxCount:1},
    {name:'audio',maxCount:1},
]),async(req,res)=>{
    try{
        console.log(req.body)
        const file = req.files;
        const picture=file.picture[0]
        const audio=file.audio[0]
        
        console.log(picture)
    
        let picturefileName = generateFileName()
        let audiofileName=generateFileName()

        const picturecommand=uploadfile(picture,picturefileName)
        const pictureresponse=await s3.send(picturecommand);
        const pictureurl='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+picturefileName+picture.originalname
        
        const audiocommand=uploadfile(audio,audiofileName)
        const audioresponse=await s3.send(audiocommand)
        const audiourl='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+audiofileName+audio.originalname
        
        const track=new trackModel({
            name:req.body.name,
            picture:pictureurl,
            audio:audiourl,
            duration:req.body.duration,
            artist:req.body.artist,
            genre:req.body.genre
        })
        console.log(track)

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
            console.log(artist)
          }else{
            
            const track=await trackModel.findById(req.body.id)
            if(req.files.picture[0]){
                const deleteObjectCommand=deletefile(track.picture) 
                const deleteresponse=await s3.send(deleteObjectCommand)
                console.log('deleted successfully')
                let fileName = generateFileName()
                const picture=req.files.picture[0]
                const command=uploadfile(picture,fileName)
                const uploadresponse=await s3.send(command);
                const url='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileName+picture.originalname
                track.picture=url
            }
            if(req.files.audio[0]){
                const deleteObjectCommand=deletefile(track.audio) 
                const deleteresponse=await s3.send(deleteObjectCommand)
                console.log('deleted successfully')
                let fileName = generateFileName()
                const audio=req.files.audio[0]
                const command=uploadfile(audio,fileName)
                const uploadresponse=await s3.send(command);
                const url='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileName+audio.originalname
                track.audio=url
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
      //delete picture ojbect in s3 bucket
      const deleteObjectCommand=deletefile(track.picture) 
      const deleteresponse=await s3.send(deleteObjectCommand)
      console.log('deleted successfully')
      //delete genre in database
      const trackdelete=await trackModel.findByIdAndDelete(track._id)    
      res.status(200).json('Track deleted successfully')
      
  }catch(err){
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})




module.exports=router