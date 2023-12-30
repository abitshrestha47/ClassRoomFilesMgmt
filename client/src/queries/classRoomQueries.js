import {gql} from '@apollo/client';

const GET_CLASSROOMS=gql`
    query getClassRooms{
        classRooms{
            id
            name
        }
    }
`;

export {GET_CLASSROOMS};