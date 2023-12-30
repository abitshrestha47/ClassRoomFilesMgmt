import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_CLASSROOMS } from '../queries/classRoomQueries'
import Spinner from './Spinner';
import ClassRoomCard from './ClassRoomCard';

const ClassRooms = () => {
    const {loading,error,data}=useQuery(GET_CLASSROOMS);
    if(loading) return <Spinner/>
    if(error) return <p>Something Went Wrong!</p>
  return (
    <>
      {data.classRooms.length>0?(
        <div className='row mt-4'>
            {data.classRooms.map((classRoom)=>(
                <ClassRoomCard key={classRoom.id} classRoom={classRoom}/>
            ))}
        </div>
      ):(<p>No ClassRooms Found!</p>)}
    </>
  )
}

export default ClassRooms