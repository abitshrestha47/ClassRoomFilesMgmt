import { gql } from "@apollo/client";

const GET_TEACHERS=gql`
    query getTeachers{
        teachers{
            id
            name
            phone
            address
        }
    }
`;

export {GET_TEACHERS};