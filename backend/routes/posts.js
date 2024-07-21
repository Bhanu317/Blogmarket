const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')
const Archivedpost=require('../models/Archivedpost')

//CREATE
router.post("/create",verifyToken,async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        // console.log(req.body)
        const savedPost=await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET POSTS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//Create Archive Post
router.post("/archive/create",verifyToken,async (req,res)=>{
    try{
        const newarchivedPost=new Archivedpost(req.body)
        // console.log(req.body)
        const savedarchivedPost=await newarchivedPost.save()
        
        res.status(200).json(savedarchivedPost)
    }
    catch(err){
        console.error(`${err.message}`)
        res.status(500).json(err)
    }
     
})

//GET ARCHIVED POSTS
// Route to get archived posts by userId
router.get('/archive/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log(`Fetching archived posts for user ID: ${userId}`); // Log userId
  
    try {
      const arposts = await Archivedpost.find({ userId });
      console.log(`Archived posts found: ${arposts.length}`); // Log the number of posts found
      res.status(200).json(arposts);
    } catch (err) {
      console.error(`Error fetching archived posts: ${err.message}`); // Log error message
      res.status(500).json({ message: err.message });
    }
  });

  router.put('/like/:userId', verifyToken, async (req, res) => {
    const userId = req.params.userId;
    const { postId } = req.body;
  
    try {
      const result = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: userId } },
        { new: true }
      );
      res.json(result);
    } catch (err) {
      res.status(422).json({ error: err.message });
    }
  });

module.exports=router