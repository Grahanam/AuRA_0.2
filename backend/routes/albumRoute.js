const express=require('express')

const multer = require('multer');

const UUID = require("uuid-v4");
const bucket=require('../firebaseadmin')
const admin=require('firebase-admin')
const uploadFile=require('../firebasestorage/upload')
// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const router=express.Router()
const albumModel=require('../models/albumModel')






router.post('/',upload.single('file'),async(req,res)=>{
    try{
      
        const file = req.file;
        const filename = `aura/album_img/${Date.now()}_${req.file.originalname}`;
        const uuid=UUID()
        const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
        const album=new albumModel({
        name:req.body.name,
        album_type:req.body.album_type,
        total_tracks:req.body.total_tracks,
        genres:req.body.genres,
        picture:{
               url:fileURL,
               filepath:filename
        }
        })
        await album.save()
        res.status(200).json({message:`${album.name} Album Saved successfully`})
  
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})

router.put('/update',upload.single('file'),async(req,res)=>{
    try{
       // console.log(req.body)
       
       if(!req.file){
         const album=await albumModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
        //  console.log(artist)
       }else{
         const album=await albumModel.findById(req.body.id)
         
         await bucket.file(album.filepath).delete()
         
         const filename = `aura/album_pic/${Date.now()}_${req.file.originalname}`;
         const uuid=UUID()
         const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
         const picture={
            url:fileURL,
            filepath:filename
         }
         album.picture=picture
         const updatealbum=await albumModel.findByIdAndUpdate(album._id,album,{new:true})
       }
       res.status(200).json({message:'Album Updated Successfully'})
        
    }catch(err){
     console.log(err)
     res.status(500).send('Internal Server Error')
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        // console.log(req.params.id)
        //find genre in database using id
        const album=await albumModel.findById(req.params.id)
        
        //delete picture object in firebase bucket
        await bucket.file(album.filepath).delete()
        console.log('deleted successfully')
        //delete artist in database
        const albumdelete=await albumModel.findByIdAndDelete(album._id)    
        res.status(200).json('Album deleted successfully')
        
    }catch(err){
      console.log(err)
      res.status(500).json('Internal Server Error')
    }
  })
  
  router.get('/single/:id',async(req,res)=>{
    try{
        const album=await albumModel.findById(req.params.id).populate('tracks artists genres')
        
        res.status(200).json({data:album,message:'success'})
        
    }catch(err){
      console.log(err)
      res.status(500).json({data:err,message:'Internal Server Error'})
    }
  }) 

  router.get('/',async(req,res)=>{
    try{
        let query=null
        if(req.query.q){
           query={name:{$regex:req.query.q,$options:'i'}}
        }
        const album=await albumModel.find(query)
        res.status(200).json({data:album,message:'success'})
    }catch(err){
        console.log(err)
        res.status(500).json({data:err,message:'Internal Server Error!'})
    }
})


module.exports=router