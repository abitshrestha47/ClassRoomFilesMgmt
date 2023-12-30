import { gql } from "@apollo/client";

const ADD_TEACHER=gql`
    mutation addTeacher($name:String!,$phone:String!,$address:String!){
        addTeacher(name:$name,phone:$phone,address:$address){
            id
            name
            phone
            address
        }
    }
`;

const DELETE_TEACHER =gql`
    mutation deleteTeacher($id:ID!){
        deleteTeacher(id:$id){
            id
            name
            phone
            address
        }
    }
`;


export {ADD_TEACHER,DELETE_TEACHER};