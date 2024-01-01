import React from 'react'
import ClassRooms from '../components/ClassRooms'
import AddClassRoomModal from '../components/AddClassRoomModal';
import AddTeacherModal from '../components/AddTeacherModal';
import Teachers from '../components/Teachers';

const Home = () => {
    return (
        <>
            <div className='d-flex gap-3 mb-4'>
                <AddClassRoomModal />
                {/* <AddTeacherModal/> */}
            </div>
            <ClassRooms />
            <hr/>
            {/* <Teachers/> */}
        </>
    )
}

export default Home