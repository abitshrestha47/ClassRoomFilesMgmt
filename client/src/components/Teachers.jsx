import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TEACHERS } from "../queries/teacherQueries";
import Spinner from "./Spinner";
import TeacherRow from "./TeacherRow";

const Teachers = () => {
    const { loading, error, data } = useQuery(GET_TEACHERS);
    if (loading) return <Spinner />;
    if (error) return <p>Something went wrong!</p>;
    return (
        <>
            {!loading && !error && (
                <table className="table table-hover mt-3">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.teachers.map(teacher=>(
                            <TeacherRow key={teacher.id} teacher={teacher}/>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Teachers;
