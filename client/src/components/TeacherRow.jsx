import { useMutation } from '@apollo/client';
import React from 'react';
import {FaTrash} from 'react-icons/fa';
import { DELETE_TEACHER } from '../mutations/teacherMutation';

const TeacherRow = ({teacher}) => {
    const [deleteTeacher]=useMutation(DELETE_TEACHER,{
        variables:{id:teacher.id},
    });
  return (
    <tr>
        <td>{teacher.name}</td>
        <td>{teacher.address}</td>
        <td>{teacher.phone}</td>
        <td>
            <button className='btn btn-danger btn-sm' onClick={deleteTeacher}><FaTrash/></button>
        </td>
    </tr>  )
}

export default TeacherRow