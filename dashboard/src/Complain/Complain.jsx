import React, { useEffect, useState } from 'react';
import config from '../config';
import { useParams } from 'react-router-dom';

function Complain() {
    const [students, setStudents] = useState([]);
   const {sid} = useParams()

    useEffect(() => {
        fetch(config.baseUrl + "students/" + sid)
            .then((res) => res.json())
            .then((data) => setStudents(data));
    }, []);

    // Filter students who have complaints
    const studentsWithComplaints = students.filter(student => student.complains && student.complains.length > 0);

    if(students)
        {
            return (
                <div className="container mt-4 custom-background">
                <table className="table custom-table table-bordered text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th>Student Name</th>
                            <th>Standard</th>
                            <th>Email ID</th>
                            <th>Complains</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentsWithComplaints.map(student => (
                            <tr key={student._id}>
                                <td>{student.fname} {student.surname}</td>
                                <td>{student.standard}</td>
                                <td>{student.email}</td>
                                <td>
                                    {student.complains.length > 0 ? (
                                        <ul className="list-unstyled">
                                            {student.complains.map((complain, index) => (
                                                <li key={index} className="d-flex align-items-start">
                                                    <div className="me-3">{complain.date}</div>
                                                    <div>{complain.complain}</div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-muted">No complaints</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {studentsWithComplaints.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center text-muted">No students with complaints</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            );
        }

        else{
            return (
                <div>No data </div>
            )
        }

 
}

export default Complain;
