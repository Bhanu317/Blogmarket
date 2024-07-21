const mongoose=require('mongoose')

const ArchivedPostSchema=new mongoose.Schema({
    postId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false,
        
    },
    username:{
        type:String,
        required:true,  
    },
    userId:{
        type:String,
        required:true,  
    },
    
},{timestamps:true})

module.exports=mongoose.model("Archivedpost",ArchivedPostSchema)