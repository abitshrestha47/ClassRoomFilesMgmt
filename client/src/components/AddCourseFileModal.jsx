import { useEffect, useState } from "react"
import { FaFile } from "react-icons/fa";
import axios from 'axios';
import { useParams } from "react-router-dom";
import FileRow from "./FileRow";

const AddCourseFileModal = () => {
    const {id}=useParams();
    const [file,setFile]=useState(null);
    const [data,setData]=useState([]);

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData=new FormData();
        formData.append("file",file);
        formData.append('courseId',id);
        try {
           await axios.post('http://localhost:8080/upload-file',formData);
        } catch (error) {
            console.log(error);
        }
    }
    const getFile=async()=>{
        try {
            const {data}=await axios.get(`http://localhost:8080/get-file/${id}`);
            setData(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getFile();
    },[]);
    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="d-flex align-items-center gap-2">
                        <label className="btn btn-secondary d-flex align-items-center" htmlFor="file"><FaFile className="icon"/><div>File</div></label>
                        <input type="file" id="file" accept='application/pdf' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])} required/>
                        {file && <div>{file.name}</div>}
                        <button type="submit" className="btn btn-primary">+</button>
                    </div>
                </form>
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>SNo.</th>
                            <th>File Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                        {data.map((file,index)=>(
                            <FileRow key={file._id} file={file} index={index}/>
                        ))}
                        </>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AddCourseFileModal