const express=require('express')

const router=express.Router()
const path=require('path')

const multer = require('multer');

// Configure multer to store uploaded files in memory
const upload = multer({ storage: multer.memoryStorage() });

const playlistModel=require('../models/playlistModel')

//firebase 
const UUID = require("uuid-v4");
const bucket=require('../firebaseadmin')
const admin=require('firebase-admin')
const uploadFile=require('../firebasestorage/upload');
const trackModel = require('../models/trackModel');



//Create Playlist
router.post('/',upload.single('file'),async(req,res)=>{
    try{
        let playlist
        if(!req.file){
            
            playlist=new playlistModel({
                title:req.body.title,
                picture:'',
                filepath:'',
                user:req.body.user,
                tracks:[]
    
            })
            // playlist=await playlistModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
            await playlist.save()
            //  console.log(playlist)
        }else{
            // console.log(file)
            const filename = `aura/playlist_pic/${Date.now()}_${req.file.originalname}`;
            const uuid=UUID()
            const fileURL = await uploadFile(req.file.buffer,filename, req.file.mimetype,uuid);
            //unique filename
        
            //genre object
            playlist=new playlistModel({
                title:req.body.title,
                picture:fileURL,
                filepath:filename,
                user:req.body.user,
                tracks:req.body.tracks
            })
        //console.log(genre)
        //saving object to database
            await playlist.save()
        }
        res.status(200).json({message:'Playlist Saved successfully'})
  
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error')
    }
})


router.put('/update',upload.single('file'),async(req,res)=>{
    try{
       // console.log(req.body)
       if(!req.file){
         const playlist=await playlistModel.findByIdAndUpdate(req.body.id,req.body,{new:true})
        //  console.log(playlist)
       }else{
         const playlist=await playlistModel.findById(req.body.id)
         
         await bucket.file(playlist.filepath).delete()
         
         const filename = `aura/playlist_pic/${Date.now()}_${req.file.originalname}`;
         const uuid=UUID()
         const fileURL = await uploadFile(req.file.buffer, filename, req.file.mimetype,uuid);
         playlist.picture=fileURL
         playlist.filepath=filename
         const updateplaylist=await playlistModel.findByIdAndUpdate(artist._id,artist,{new:true})
       }
       res.status(200).json({message:'Playlist Updated Successfully'})
        
    }catch(err){
     console.log(err)
     res.status(500).send('Internal Server Error')
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        // console.log(req.params.id)
        //find genre in database using id
        const playlist=await playlistModel.findById(req.params.id)
        
        //delete picture object in firebase bucket
        await bucket.file(playlist.filepath).delete()
        console.log('deleted successfully')
        //delete artist in database
        const playlistdelete=await playlistModel.findByIdAndDelete(playlist._id)    
        res.status(200).json('playlist deleted successfully')
        
    }catch(err){
      console.log(err)
      res.status(500).json('Internal Server Error')
    }
})

router.get('/single/:id',async(req,res)=>{
    try{
        
        const playlist=await playlistModel.findById(req.params.id).populate('tracks')
          
        res.status(200).json({data:playlist,message:'playlist deleted successfully'})
        
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
        const playlist=await playlistModel.find(query)
        
        res.status(200).json({data:playlist,message:'success'})
    }catch(err){
        console.log(err)
        res.status(500).json({data:err,message:'Internal Server Error!'})
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const playlist=await playlistModel.find({user:req.params.id})
        
        res.status(200).json({data:playlist,message:'success'})
    }catch(err){
        // console.log(err)
        res.status(500).json({data:err,message:'Internal Server Error!'})
    }
})

router.put('/add/:id',async(req,res)=>{
    try{ 
        // console.log(req.body)
        const playlist=await playlistModel.findById(req.params.id)
        const track=await trackModel.findById(req.body.id)
        if(!playlist || !track){
            res.status(500).json({message:'Playlist not found'})
        }
        playlist.tracks.push(track)
        await playlist.save()

        res.status(200).json({message:'song Added successfully'}) 

    }catch(err){
        res.status(500).json({data:err,message:"Internal Server Error!"})
    }
})

router.put('/remove/:id',async(req,res)=>{
    try{ 
        // console.log(req.body)
        const playlist=await playlistModel.findById(req.params.id)
        const trackid=req.body.track
        if(!playlist){
            res.status(500).json({message:'Playlist not found'})
        }
        
       const trackIndex = playlist.tracks.findIndex((track) => track.toString() === trackid);

       if (trackIndex === -1) {
           res.status(500).json({ message: 'Track not found in the playlist' });
           return;
       }

       // Remove the track from the playlist's tracks array
       playlist.tracks.splice(trackIndex, 1);

       await playlist.save();

       res.status(200).json({ message: 'Track removed successfully' });

    }catch(err){
        res.status(500).json({data:err,message:"Internal Server Error!"})
    }
})



module.exports=router