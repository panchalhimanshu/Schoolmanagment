import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { studentdetailsprovide } from '../App';
import config from '../config';

function Student() {

    const {sid} =  useParams()
    const { studentdetails, setstudentdetails } = useContext(studentdetailsprovide);
    const [searchQuery, setSearchQuery] = useState('');
    const [data, setdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch(config.baseUrl + "students/" + sid)
            .then((res) => res.json())
            .then((data) => setdata(data));
    }, []);

    const handleEdit = (id) => {
        navigate("/students/" + id)
        // console.log(process.env.REACT_APP)
    };

    const handleDelete = (id) => {
        fetch(config.baseUrl + "students/" + id, {
            method: "delete",
            headers: { "content-type": "application/json" }
        })
            .then((res) =>{
                if(res)
                    {
                        
                  window.location.reload();

                    }
            })
            .then((data) => console.log(data));
    };

    const handleView = (value) => {
        localStorage.setItem('selectedStudent', JSON.stringify(value));
        setstudentdetails(value);
        setTimeout(() => {
            navigate("/studentdetails");
        }, 1000);
    };

    const filteredData = data.filter((student) => {
        const fullName = `${student.surname} ${student.fname} ${student.lname}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });

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
        <Link to={'/studentdashboard'}>
            <button className='btn btn-warning'>Back</button>
        </Link>
        <h1 className='text-center text-success pt-3'>Student List</h1>
        <div className="my-3 w-50 mx-auto">
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
                    <th scope="col">Roll No</th>
                    <th scope="col">Name</th>
                    <th scope="col">BOD</th>
                    <th scope="col">Standard</th>
                    <th scope="col">Age</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((v) => (
                    <tr key={v._id}>
                        <th scope="row">{v.rollno}</th>
                        <td>{v.surname} {v.fname} {v.lname}</td>
                        <td>{v.birthdate}</td>
                        <td>{v.standard}</td>
                        <td>{v.age}</td>
                        <td>{v.email}</td>
                        <td>{v.phonenumber}</td>
                        <td>
                            <button className='btn btn-secondary' onClick={() => handleView(v)}>View</button>
                            <button className='btn btn-primary mx-1' onClick={() => handleEdit(v._id)}>Edit</button>
                            <button className='btn btn-danger' onClick={() => handleDelete(v._id)}>Delete</button>
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

export default Student;
