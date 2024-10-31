import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    userId:{type:String, required:true},
    foodId: {type:String, required:true},
    userName: {type:String, required:true},
    text : {type:String, required:true},
    rating : {type:Number, required:true},
    date : {type:Date, default:Date.now}
})

const commentModel = mongoose.models.comments || mongoose.model("comments",commentSchema)

export default commentModel