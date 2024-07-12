import React from 'react'
import { Link } from 'react-router-dom'

function Assignmentdashboard() {

  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)

  return (
    <div className='d-flex justify-content-center align-items-center gap-3' style={{ height: "100vh", background: "#020237" }}>
      <Link to={'/ass'} >  <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow' >
        Assignment Upload
      </div></Link>
      <Link to={`/assigments/${admindetail._id}`}>    <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
      Assignments
      </div></Link>

    </div>
  )
}

export default Assignmentdashboard