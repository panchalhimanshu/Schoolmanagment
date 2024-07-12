import React from 'react'
import { Link } from 'react-router-dom'

function Teacherdashboard() {

  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)

  return (
    // <Link to={'/newteacher'}> <button className='d-block mx-auto mt-3 btn btn-success'>New Teacher</button></Link>
    // <Link to={'/teacher'}> <button className='d-block mx-auto mt-3 btn btn-success'>Teachers</button> </Link>


    <div className='d-flex justify-content-center align-items-center gap-3' style={{ height: "100vh", background: "#020237" }}>
      <Link to={'/newteacher'} >  <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow' >
        New Teacher
      </div></Link>
      <Link to={`/teacher/${admindetail._id}`}>    <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
        Teachers
      </div></Link>

    </div>

  )
}

export default Teacherdashboard