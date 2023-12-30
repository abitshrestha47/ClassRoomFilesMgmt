import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { Course } from "../models/Course.js";
import { ClassRoom } from "../models/ClassRoom.js";
import { Teacher } from "../models/Teacher.js";
import mongoose from "mongoose";

const ClassRoomType=new GraphQLObjectType({
    name:"ClassRoom",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        courses:{
            type:new GraphQLList(CourseType),
            resolve(parent,args){
                const classRoomId =new mongoose.Types.ObjectId(parent.id);
                return Course.find({ classRoomId });           
            }
        }
    })
});

const CourseType=new GraphQLObjectType({
    name:"Course",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        teacher:{
            type:TeacherType,
            resolve(parent,args){
            },
        },
        classRoom:{
            type:ClassRoomType,
            resolve(parent,args){
                return ClassRoom.findById(parent.classRoomId);
            }
        }
    })
});

const TeacherType=new GraphQLObjectType({
    name:"Teacher",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        address:{type:GraphQLString},
        phone:{type:GraphQLString},
        classRoom:{
            type:ClassRoomType,
            resolve(parent,args){
                const classRoomId=new mongoose.Types.ObjectId(parent.id);
                return Teacher.find({classRoomId});
            }
        }
    })
});

const mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //add a class
        addClassRoom:{
            type:ClassRoomType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parents,args){
               const classRoom=new ClassRoom({
                    name:args.name,
               });
               return classRoom.save();
            }
        },
        updateClassRoom:{
            type:ClassRoomType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                courseId:{type:GraphQLID},
            },
            resolve(parents,args){
                return ClassRoom.findByIdAndUpdate(
                    args.id,
                    {
                        $set:{
                            name:args.name,
                        },
                        $push:{
                            courses:args.courseId,
                        },
                    },
                    {new:true}
                );
            },
        },
        //delete a class
        deleteClassRoom:{
            type:ClassRoomType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parents,args){
                return ClassRoom.findByIdAndDelete(args.id);
            }
        },
        //add a course
        addCourse:{
            type:CourseType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description:{type:GraphQLNonNull(GraphQLString)},
                teacherId:{type:GraphQLID},
                classRoomId:{type:GraphQLNonNull(GraphQLID)},
            },
            async resolve(parents,args){
                const course=new Course({
                    name:args.name,
                    description:args.description,
                    teacherId:args.teacherId,
                    classRoomId:args.classRoomId,
                });
                const savedCourse=await course.save();
                await ClassRoom.updateOne(
                    {_id:args.classRoomId},
                    {$push:{courses:savedCourse._id}}
                );
                return savedCourse;
            }

        },
        //add teacher
        addTeacher:{
            type:TeacherType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                phone:{type:GraphQLNonNull(GraphQLString)},
                address:{type:GraphQLNonNull(GraphQLString)},
            },
            resolve(parents,args){
                const teacher=new Teacher({
                    name:args.name,
                    phone:args.phone,
                    address:args.address,
                });
                return teacher.save();
            }
        },
        deleteTeacher:{
            type:TeacherType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parents,args){
                return Teacher.findByIdAndDelete(args.id);
            }
        }
    }
});

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        classRooms:{
            type:new GraphQLList(ClassRoomType),
            resolve(parent,args){
                return ClassRoom.find();
            }
        },
        singleClassRoom:{
            type:ClassRoomType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent,args){
                const singleClassRoom=await ClassRoom.findById(args.id);
                return singleClassRoom;
            },
        },
        courses:{
            type:new GraphQLList(CourseType),
            resolve(parent,args){
                return Course.find();
            }
        },
        teachers:{
            type:new GraphQLList(TeacherType),
            resolve(parent,args){
                return Teacher.find();
            }
        }
    }
})

const schema=new GraphQLSchema({
    query:RootQuery,
    mutation
});

export default schema;