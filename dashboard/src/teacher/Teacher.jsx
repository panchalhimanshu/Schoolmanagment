import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { teacherdetailsprovide } from '../App';
import config from '../config';

function Teacher() {
    const {sid} =  useParams()
    var admintinfo = localStorage.getItem('admintinfo');

    const admindetail =  JSON.parse(admintinfo)
    const { teacherdetails, setteacherdetails } = useContext(teacherdetailsprovide);
    const [data, setdata] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items per page
    const navigate = useNavigate();

    useEffect(() => {
        fetch(config.baseUrl +  "teachers/" + sid)
            .then((res) => res.json())
            .then((data) => setdata(data));
    }, []);

    const handleEdit = (id) => {
        navigate("/teacheredit/" + id)
    };

    const handleDelete = (id) => {
        fetch(config.baseUrl +  "teachers/" + id, {
            method: "delete",
            headers: { "content-type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
            window.location.reload();
    };

    const filteredData = data.filter((teacher) => {
        const fullName = `${teacher.surname} ${teacher.fname} ${teacher.lname}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container mt-5">
        <Link to={'/teacherdashboard'}>
            <button className='btn btn-warning'>Back</button>
        </Link>
        <h1 className='text-center text-success pt-3'>Teachers List</h1>
        <div className="my-3 w-50 m-auto">
            <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <table className="table mt-4">
            <thead>
                <tr>
                    {/* <th scope="col">ID</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">BOD</th>
                    <th scope="col">Subject</th>
                    <th scope="col">Standard</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((teacher) => (
                    <tr key={teacher._id}>
                        {/* <td>{teacher._id}</td> */}
                        <td>{teacher.surname} {teacher.fname} {teacher.lname}</td>
                        <td>{teacher.birthdate}</td>
                        <td>{teacher.subject}</td>
                        <td>{teacher.standard}</td>
                        <td>{teacher.age}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phonenumber}</td>
                        <td>
                            <button className='btn btn-secondary' onClick={() => { localStorage.setItem('selectedTeacher', JSON.stringify(teacher)); setteacherdetails(teacher); navigate("/teacherdetails"); }}>View</button>
                            <button className='btn btn-primary mx-1' onClick={() => handleEdit(teacher._id)}>Edit</button>
                            <button className='btn btn-danger' onClick={() => handleDelete(teacher._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        {/* Pagination */}
        <ul className="pagination justify-content-end">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button onClick={handlePrevPage} className="page-link">Previous</button>
            </li>
            {Array(Math.ceil(filteredData.length / itemsPerPage))
                .fill()
                .map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
            <li className={`page-item ${currentPage === Math.ceil(filteredData.length / itemsPerPage) ? 'disabled' : ''}`}>
                <button onClick={handleNextPage} className="page-link">Next</button>
            </li>
        </ul>
    </div>
    );
}

export default Teacher;
