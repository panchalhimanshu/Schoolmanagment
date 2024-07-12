import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Studentdashboard() { 
   const navigate = useNavigate()
  const handleclick = ()=>{
     
    toast.error("Logout")

  setTimeout(() => {
    localStorage.removeItem("teacherinfo")
    navigate("/")
  }, 3000);
}

  return (
    <div style={{ background: "#020237", height: "100vh", overflowY: "hidden" }} className='p-5'>
    <button className='btn btn-danger d-block ms-auto' onClick={handleclick}>Logout</button>
    <div className='d-flex flex-wrap justify-content-center align-items-center gap-3' style={{ height: "calc(100vh - 56px)", overflowY: "auto" }}>
        {/* Subtracting the height of the button from the container's height to avoid scroll */}
        <Link to={'/studentprofile'}><div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
            Profile
        </div></Link>
        {/* <Link to={'/studentcomplain'}><div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
            Complain
        </div></Link> */}
        <Link to={'/assignment'}><div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
        Assignment
        </div></Link>
    </div>
    <ToastContainer position="top-center" />
</div>

  )
}

export default Studentdashboard