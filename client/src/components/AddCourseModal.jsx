import { useState } from "react"
import { FaGraduationCap } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../mutations/courseMutatation";
import { useParams } from "react-router-dom";

const AddCourseModal = () => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [addCourse, { loading, error }] = useMutation(ADD_COURSE);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (name === '' || description === '') {
                return alert('Please fill in all the form');
            }
            await addCourse({
                variables: { name, description,id},
            });
            setName('');
            setDescription('');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addCourseModal">
                    <div className='d-flex align-items-center'>
                        <FaGraduationCap className="icon" />
                        <div>Add Course</div>
                    </div>
                </button>
                <div className="modal fade" id="addCourseModal" aria-labelledby="addCourseModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="addCourseModalLabel">Add Course</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description:</label>
                                        <input className="form-control" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    <button className="btn btn-secondary" type='submit' data-bs-dismiss='modal'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourseModal