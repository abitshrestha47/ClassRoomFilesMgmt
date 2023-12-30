import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='col-md-6'>
      <div className='card mb-3'>
        <div className='card-body'>
          <div className='d-flex justify-content-center align-items-center'>
            <h5 className='card-title'>{course.name}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard

  