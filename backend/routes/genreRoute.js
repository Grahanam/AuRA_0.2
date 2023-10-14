const express=require('express')
const crypto = require('crypto');
const router=express.Router()
const multer = require('multer');
const path=require('path')

const UUID = require("uuid-v4");
const bucket=require('../firebaseadmin')
const admin=require('firebase-admin')
const uploadFile=require('../firebasestorage/upload')

//S3 Admin sdk
const s3=require('../s3/s3')

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

//Genre Model
const genreModel=require('../models/genreModel')

const bucketName = process.env.S3_BUCKET;
const bucketRegion = process.env.S3_REGION;


//Filename generator
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

//S3 bucket upload object
const uploadfile=(file,fileName)=>{
  let params = {
    Bucket: bucketName,
    Key:  fileName+file.originalname,
    Body: file.buffer ,
    ContentType: file.mimetype,
  };
  return command = new PutObjectCommand(params);
}


//S3 bucket delete object
const deletefile=(url)=>{
  const urlsegment=url.split('/')
  const filename=urlsegment[urlsegment.length-1]
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: filename,
  });
  return deleteObjectCommand
}

//Create Genre 
router.post('/',upload.single('file'),async(req,res)=>{
    try{
        const file = req.file;
        // console.log(file)
        const filename = `aura/genre_img/${Date.now()}_${req.file.originalname}`;
        const uuid=UUID()
        const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
        //unique filename
        
        //genre object
        const genre=new genreModel({
        title:req.body.title,
        picture:{
               url:fileURL,
               filepath:filename
        }
        })
        //console.log(genre)
        //saving object to database
        await genre.save()
        res.status(200).json({message:'Genre Saved successfully'})
  
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.get('/',async(req,res)=>{
  try{

      const genre=await genreModel.find()
      
      res.status(200).json({data:genre,message:'success'})
  }catch(err){
      console.log(err)
      res.status(500).json({data:err,message:'Internal Server Error!'})
  }
})

router.put('/update',upload.single('file'),async(req,res)=>{
       try{
          // console.log(req.body)
          
          if(!req.file){
             const genre=await genreModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
          console.log(genre)
          }else{
            const genre=await genreModel.findById(req.body.id)
            await bucket.file(genre.filepath).delete()
            // const deleteObjectCommand=deletefile(genre.picture) 
            // const deleteresponse=await s3.send(deleteObjectCommand)
            console.log('deleted successfully')
            const filename = `aura/genre_pic/${Date.now()}_${req.file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
            genre.picture=fileURL
            genre.filepath=filename
            const updategenre=await genreModel.findByIdAndUpdate(genre._id,genre,{new:true})
          }
          res.status(200).json({message:'Genre Updated Successfully'})
           
       }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
       }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
      const genre=await genreModel.findById(req.params.id)
      //delete picture ojbect in s3 bucket
      await bucket.file(genre.filepath).delete()
      // const deleteObjectCommand=deletefile(genre.picture) 
      // const deleteresponse=await s3.send(deleteObjectCommand)
      console.log('deleted successfully')
      //delete genre in database
      const genredelete=await genreModel.findByIdAndDelete(genre._id)    
      res.status(200).json('Genre deleted successfully')
      
  }catch(err){
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})


router.get('/single/:id',async(req,res)=>{
  try{
      
      const genre=await genreModel.findById(req.params.id)
      res.status(200).json({data:genre,message:'success'})
      
  }catch(err){
    // console.log(err)
    res.status(500).json({data:err,message:'Internal Server Error'})
  }
}) 


module.exports=router