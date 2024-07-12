import React, { useContext, useEffect, useState } from 'react'
import { studentdetailsprovide, teacherdetailsprovide } from '../App'
import { Navigate, useNavigate } from 'react-router-dom';

function Teacherdetails() {

  // const {teacherdetails} = useContext(teacherdetailsprovide)

  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)

  const data1 = localStorage.getItem('selectedTeacher');
  const teacherdetails = JSON.parse(data1)
  const Navigate = useNavigate()
  // console.log(teacherdetails)
  // const [data, setdata] = useState([])

  // useEffect(()=>{
  //     fetch("http://localhost:2000/studen").then((res)=>res.json()).then((data)=> setdata(data.find((v)=>v.standard == studentdetails.standard)))
  // },[data])

  const handleEdit = (id) => {
    Navigate("/teacheredit/" + id)
    };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-success pt-3">Teacher Details</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <table className="table table-bordered shadow table table-striped">
            <tbody>
              <tr>
                <th className="py-2 px-4">ID:</th>
                <td>{teacherdetails._id}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Name:</th>
                <td>{teacherdetails.surname} {teacherdetails.fname} {teacherdetails.lname}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">BOD:</th>
                <td>{teacherdetails.birthdate}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Main standard:</th>
                <td>{teacherdetails.mainstandard}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Standard:</th>
                <td>{teacherdetails.standard}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Age:</th>
                <td>{teacherdetails.age}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Zender:</th>
                <td>{teacherdetails.zender}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Email:</th>
                <td>{teacherdetails.email}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Phone-Number:</th>
                <td>{teacherdetails.phonenumber}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Subject:</th>
                <td>{teacherdetails.subject}</td>
              </tr>
              <tr>
                <th className="py-2 px-4">Action:</th>
                <td><button className="btn btn-primary" onClick={() => handleEdit(teacherdetails._id)}>Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Teacherdetails