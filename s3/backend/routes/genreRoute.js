const express=require('express')
const crypto = require('crypto');
const router=express.Router()
const multer = require('multer');
const path=require('path')
const {PutObjectCommand,DeleteObjectCommand} = require("@aws-sdk/client-s3");

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

        //unique filename
        let fileName = generateFileName()
        const command=uploadfile(file,fileName)
        //saving file to s3 bucket 
        const response=await s3.send(command);
        //s3 Object Url
        const url='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileName+file.originalname
        //genre object
        const genre=new genreModel({
        title:req.body.title,
        picture:url
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

router.put('/update',upload.single('file'),async(req,res)=>{
       try{
          // console.log(req.body)
          
          if(!req.file){
             const genre=await genreModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
          console.log(genre)
          }else{
            const genre=await genreModel.findById(req.body.id)
            const deleteObjectCommand=deletefile(genre.picture) 
            const deleteresponse=await s3.send(deleteObjectCommand)
            console.log('deleted successfully')
            let fileName = generateFileName()
            const command=uploadfile(req.file,fileName)
            const uploadresponse=await s3.send(command);
            const url='https://'+bucketName+'.s3.'+bucketRegion+'.amazonaws.com/'+fileName+req.file.originalname
            genre.picture=url
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
      // console.log(req.params.id)
      //find genre in database using id
      const genre=await genreModel.findById(req.params.id)
      //delete picture ojbect in s3 bucket
      const deleteObjectCommand=deletefile(genre.picture) 
      const deleteresponse=await s3.send(deleteObjectCommand)

      console.log('deleted successfully')
      //delete genre in database
      const genredelete=await genreModel.findByIdAndDelete(genre._id)    
      res.status(200).json('Genre deleted successfully')
      
  }catch(err){
    console.log(err)
    res.status(500).json('Internal Server Error')
  }
})



module.exports=router