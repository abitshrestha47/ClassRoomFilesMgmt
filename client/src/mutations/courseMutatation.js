import { gql } from "@apollo/client";

const ADD_COURSE=gql`
    mutation addCourse($name:String!,$description:String!,$id:ID!){
        addCourse(name:$name,description:$description,classRoomId:$id){
            id
            name
            description
            classRoom{
                name
            }
        }
    }
`;


export {ADD_COURSE};