const express=require('express')

const multer = require('multer');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const router=express.Router()
const artistModel=require('../models/artistModel')

const s3=require('../s3/s3')
const deletefile=require('../s3/deletes3')
const uploadfile=require('../s3/uploads3')

const generateFileName=require('../s3/generateFileName')

const bucketName = process.env.S3_BUCKET;
const bucketRegion = process.env.S3_REGION;


//Create Artist
router.post('/',upload.single('file'),async(req,res)=>{
    try{
        const file = req.file;
        // console.log(file)

        //unique filename
        let fileName = generateFileName()
        const command=uploadfile(file,fileName)
        //saving file to s3 bucket 
        const response=await s3.send(command);
        //s3 Object Url
        const url='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileName+file.originalname
        //genre object
        const artist=new artistModel({
        name:req.body.name,
        picture:url
        })
        //console.log(genre)
        //saving object to database
        await artist.save()
        res.status(200).json({message:'Artist Saved successfully'})
  
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/',async(req,res)=>{
    try{
        const artist=await artistModel.find()
        res.status(200).json({data:artist,message:'success'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'Internal Server Error!'})
    }
})

router.put('/update',upload.single('file'),async(req,res)=>{
       try{
          // console.log(req.body)
          
          if(!req.file){
            const artist=await artistModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
            console.log(artist)
          }else{
            const artist=await artistModel.findById(req.body.id)
            const deleteObjectCommand=deletefile(artist.picture) 
            const deleteresponse=await s3.send(deleteObjectCommand)
            console.log('deleted successfully')
            let fileName = generateFileName()
            const command=uploadfile(req.file,fileName)
            const uploadresponse=await s3.send(command);
            const url='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileName+req.file.originalname
            artist.picture=url
            const updateartist=await artistModel.findByIdAndUpdate(artist._id,artist,{new:true})
          }
          res.status(200).json({message:'Genre Updated Successfully'})
           
       }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
       }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
      // console.log(req.params.id)
      //find genre in database using id
      const artist=await artistModel.findById(req.params.id)
      //delete picture ojbect in s3 bucket
      const deleteObjectCommand=deletefile(artist.picture) 
      const deleteresponse=await s3.send(deleteObjectCommand)

      console.log('deleted successfully')
      //delete genre in database
      const artistdelete=await artistModel.findByIdAndDelete(artist._id)    
      res.status(200).json('Genre deleted successfully')
      
  }catch(err){
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})



module.exports=router