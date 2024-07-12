import React from 'react'
import { useNavigate } from 'react-router-dom'

function Studentprofile() {
  const navigate =  useNavigate()
  const handleclick = ()=>{
      localStorage.removeItem("teacherinfo")
      navigate("/")
  }
  const student =  localStorage.getItem("teacherinfo")
  const studentdetails = JSON.parse(student)
  return (
    <div style={{ background: "#020237", height: "100vh" }} className='p-5'>
<div className="d-flex justify-content-between align-items-center">
        <button className='btn btn-warning' onClick={()=>navigate("/studentdashboard")}>Back</button>
        {/* <button className='btn btn-danger' onClick={handleclick}>Logout</button> */}
    </div>

    <div className="container mt-5">
        <h1 className="text-center text-white mb-5">Profile</h1>
        <div className="row">
            <div className="col-md-8 m-auto col-sm-12">
                <table className="table table-striped ">
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

  )
}

export default Studentprofile