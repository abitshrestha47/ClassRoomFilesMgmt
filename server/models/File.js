import mongoose from "mongoose";

const FileSchema=new mongoose.Schema({
    fileName:{
        type:String,
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
    }
});

export const File=mongoose.model('File',FileSchema);