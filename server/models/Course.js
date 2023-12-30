import mongoose from "mongoose";

const CourseSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
        default:null,
    },
    classRoomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ClassRoom',
    }
});

export const Course=mongoose.model('Course',CourseSchema);