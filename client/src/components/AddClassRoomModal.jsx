import { useState } from "react"
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLASSROOM } from "../mutations/classRoomMutation";

const AddClassRoomModal = () => {
    const [name, setName] = useState('');


    const [addClassRoom] = useMutation(ADD_CLASSROOM, {
        variables: { name},
    })

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '') {
            return alert('Please fill in the form');
        }
        addClassRoom(name);
        setName('');
    }
    return (
        <>
            <div>
                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClassRoomModal">
                    <div className='d-flex align-items-center'>
                        <FaUser className="icon" />
                        <div>Add ClassRoom</div>
                    </div>
                </button>
                <div className="modal fade" id="addClassRoomModal" aria-labelledby="addClassRoomModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add ClassRoom</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
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

export default AddClassRoomModal