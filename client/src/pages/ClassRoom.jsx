import React from 'react'
import AddCourseModal from '../components/AddCourseModal'
import CourseCard from '../components/CourseCard'
import { GET_CLASSROOM_COURSES } from '../queries/courseQueries'
import Spinner from '../components/Spinner'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import AddTeacherModal from '../components/AddTeacherModal'

const ClassRoom = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CLASSROOM_COURSES, {
    variables: { id: id },
  });
  if (loading) return <Spinner />
  if (error) return <p>Something went wrong!</p>
  return (
    <div>
        <AddCourseModal />
      {
        data.singleClassRoom.courses.length > 0 ? (
          <div className='row mt-4'>
            {data.singleClassRoom.courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (<p>No courses found!</p>)}
    </div>
  )
}

export default ClassRoom