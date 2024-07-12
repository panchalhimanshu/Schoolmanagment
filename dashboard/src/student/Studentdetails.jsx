import React, { useContext, useEffect, useState } from 'react';
import { teacherdetailsprovide } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

function Studentdetails() {

  
  const { setteacherdetails } = useContext(teacherdetailsprovide);
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [assdata, setassdata] = useState([]);
  const data1 = localStorage.getItem('selectedStudent');
  const studentdetails = JSON.parse(data1);

  useEffect(() => {
    fetch(config.baseUrl + "teachers/" + studentdetails.schoolid)
      .then((res) => res.json())
      .then((data) => setdata(data.find((v) => v.mainstandard == studentdetails.standard)));

    fetch( config.baseUrl + "images/" + studentdetails.schoolid)
      .then((res) => res.json())
      .then((data) => setassdata(data.filter((v) => v.standard == studentdetails.standard)));
  }, []);

  const handleedit = (id) => {
    navigate("/students/" + id)
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success mb-5">Student Details</h1>
      <div className="row">
        <div className="col-md-6">
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Student id:</th>
                <td>{studentdetails._id}</td>
              </tr>
              <tr>
                <th>FullName:</th>
                <td> {studentdetails.surname}  {studentdetails.fname} {studentdetails.lname}</td>
              </tr>
              <tr>
                <th>Zender:</th>
                <td>{studentdetails.zender}</td>
              </tr>
              <tr>
                <th>DOB:</th>
                <td>{studentdetails.birthdate}</td>
              </tr>
              <tr>
                <th>STD:</th>
                <td>{studentdetails.standard}</td>
              </tr>
              <tr>
                <th>Age:</th>
                <td>{studentdetails.age}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{studentdetails.email}</td>
              </tr>
              <tr>
                <th>Roll No:</th>
                <td>{studentdetails.rollno}</td>
              </tr>
              <tr>
                <th>Phone-number:</th>
                <td>{studentdetails.phonenumber}</td>
              </tr>
              {/* <tr>
                <th>Complains:</th>
                <td>
                  <span className="bg-danger p-1 px-2 rounded-5">{studentdetails.complains ? studentdetails.complains.length : "0"}</span>
                  <ul>
                    {studentdetails.complains ? studentdetails.complains.map((v, index) => <li key={index}>{v.date} {v.complain}</li>) : "no Complain"}
                  </ul>
                </td>
              </tr> */}
              <tr>
                <th>Class Teacher:</th>
              {data &&   <td>
                  {data.surname} {data.fname} {data.lname}
                  <button className="btn btn-primary ms-3" onClick={() => { setteacherdetails(data); localStorage.setItem('selectedTeacher', JSON.stringify(data)); navigate("/teacherdetails"); }}>View Teacher Details</button>
                </td> }
              </tr>
              <tr>
                <th>Action:</th>
                <td>
                  <button className="btn btn-primary" onClick={() => handleedit(studentdetails._id)}>Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h3 className="mb-3 text-center">Assignment</h3>
          <div className="d-flex flex-wrap justify-content-center gap-2 ">
          {assdata && assdata.map((image) => (
              <div key={image._id} className="image-item mb-3 border border-secondary pb-2">
                <img src={`data:image/jpeg;base64,${image.data}`} alt={image.originalname} style={{ height: '100px', width: '100%' , objectFit:"cover"}} />
                {/* <p>{image.originalname}</p> */}
                <p className='pt-2 px-2'> Subject : { image.subject && image.subject} </p>
                {image.originalname.slice(-3) === "pdf" ?
                  <a href={`data:application/pdf;base64,${image.data}`} download>Download </a> :
                  <a href={`data:image/jpeg;base64,${image.data}`} download><button className="btn btn-primary d-block m-auto">Download</button></a>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Studentdetails;
