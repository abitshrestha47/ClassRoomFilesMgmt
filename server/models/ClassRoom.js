import mongoose from "mongoose";

const ClassRoomSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
        },
    ],
});

export const ClassRoom=mongoose.model('ClassRoom',ClassRoomSchema);