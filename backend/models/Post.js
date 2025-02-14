const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types

const PostSchema=new mongoose.Schema({
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
    categories:{
        type:Array,
        unique:true
        
    },
    likes:[{type:String,ref:"User"}],
},{timestamps:true})

module.exports=mongoose.model("Post",PostSchema)