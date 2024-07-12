import React from 'react'
import { Link } from 'react-router-dom'

function Logrg() {
  return (
    <div className='d-flex justify-content-center align-items-center gap-3' style={{ height: "100vh", background: "#020237" }}>
      <Link to={'/adminlogin'} >  <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow' >
        Admin Login
      </div></Link>
      <Link to={'/admintregister'}>    <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
        Admin Register
      </div></Link>

    </div>
  )
}

export default Logrg