import mongoose from "mongoose";

const TeacherSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    coursesTaught:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
        },
    ], 
});

export const Teacher=mongoose.model('Teacher',TeacherSchema);