import {gql} from '@apollo/client';

const ADD_CLASSROOM=gql`
    mutation addClassRoom($name:String!){
        addClassRoom(name:$name){
            id
            name
        }
    }
`;

const DELETE_CLASSROOM =gql`
    mutation deleteClassRoom($id:ID!){
        deleteClassRoom(id:$id){
            id
            name
        }
    }
`;

export {ADD_CLASSROOM,DELETE_CLASSROOM};