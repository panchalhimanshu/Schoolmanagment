import React from 'react'
import { Link } from 'react-router-dom'

function Studentdashboard() {

  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)

  return (
    <div className='d-flex justify-content-center align-items-center gap-3' style={{ height: "100vh", background: "#020237" }}>
      <Link to={'/newstudent'} >  <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow' >
        New Student
      </div></Link>
      <Link to={`/student/${admindetail._id}`}>    <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
        Students
      </div></Link>

    </div>
  )
}

export default Studentdashboard