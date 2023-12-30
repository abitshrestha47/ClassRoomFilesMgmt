import React from 'react'

const ClassRoomCard = ({classRoom}) => {
  return (
    <div className='col-md-6'>
        <div className='card mb-3'>
            <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='card-title'>{classRoom.name}</h5>
                    <a className='btn btn-light' href={`/classRoom/${classRoom.id}`}>View</a>
                </div>
                <p className='small'>
                </p>
            </div>
        </div>
    </div>
  )
}

export default ClassRoomCard