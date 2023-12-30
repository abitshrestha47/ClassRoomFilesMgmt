import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { MdPerson } from 'react-icons/md' 
import { ADD_TEACHER } from '../mutations/teacherMutation';

const AddTeacherModal = () => {
    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [phone,setPhone]=useState('');

    const [addTeacher,error]=useMutation(ADD_TEACHER);
    const onSubmit=async(e)=>{
        e.preventDefault();
        try {
            if(!name || !phone || !address){
                return alert("Please fill in all forms!");
            }
            await addTeacher({
                variables:{name,phone,address},
            });
            setName('')
            setPhone('')
            setAddress('')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTeacherModal">
                    <div className='d-flex align-items-center'>
                        <MdPerson className="icon" />
                        <div>Add Teacher</div>
                    </div>
                </button>
                <div className="modal fade" id="addTeacherModal" aria-labelledby="addTeacherModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="addTeacherModalLabel">Add Teacher</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name:</label>
                                        <input className="form-control" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label'>Phone:</label>
                                        <input className='form-control' type='text' id='phone' value={phone} onChange={(e)=>setPhone(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address:</label>
                                        <input className="form-control" type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <button className="btn btn-primary" type='submit' data-bs-dismiss='modal'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTeacherModal