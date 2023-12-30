import {gql} from '@apollo/client';

const GET_COURSES=gql`
    query getCourses{
        courses{
            id
            name
            description
            classRoom{
                name
            }
        }
    }
`;

const GET_CLASSROOM_COURSES=gql`
    query getClassRoomCourses($id:ID!){
        singleClassRoom(id:$id){
            id
            name
            courses{
                id
                name
            }
        }
    }
`;

export {GET_COURSES,GET_CLASSROOM_COURSES};