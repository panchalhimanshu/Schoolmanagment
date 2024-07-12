import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import config from './config';
import teacherimg from "./img/teacherimg.png"
import studentimg from "./img/students.png"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function Home() {


  const navigate = useNavigate()
  const handleclick = ()=>{
     
    toast.error("Logout")

  setTimeout(() => {
    localStorage.removeItem("admintinfo")
    navigate("/")
  }, 3000);
}

  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)
  
  const [students, setStudents] = useState([]);
  const [teacher, setteacher] = useState([]);




  useEffect(() => {
      fetch(config.baseUrl + "students/"+ admindetail._id)
          .then((res) => res.json())
          .then((data) => setStudents(data));


          fetch(config.baseUrl + "teachers/"+ admindetail._id)
          .then((res) => res.json())
          .then((data) => setteacher(data));
  }, []);

  return (
    <>
     <ToastContainer position="top-center" />
    <div  style={{background: "#020237",padding : "10px"}} >  <button className='btn btn-danger d-block ms-auto' onClick={handleclick}>Logout</button></div>
    <div className='d-flex justify-content-center align-items-center gap-3' style={{height:"100vh",background: "#020237"}}>
 
<div>

      <div className='d-flex justify-content-center align-items-center gap-3' style={{ background: "#020237" }}>
        
        <Link to={'/assignment'} >  <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow' >
          Assignment
        </div></Link>
        <Link to={'/studentdashboard'} ><div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow' >
          Student
        </div></Link>
        <Link to={'/teacherdashboard'}><div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
          Teacher
        </div></Link>

      </div>




      <div className='d-flex justify-content-center align-items-center gap-3 mt-3' style={{  background: "#020237" }}>
      <Link to={`/Complain/${admindetail._id}`}><div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
          Complains
        </div></Link>

        <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
      <div style={{ height: "50px", width: "200px",}}>  <img src={studentimg} alt="" />  </div>
      <div style={{ height: "100px", width: "200px",}} className='fw-bold fs-5 text-primary'>Total Students   {students ? students.length : "0"} </div>
        </div>



        <div style={{ height: "200px", width: "200px", background: "white", textAlign: "center", lineHeight: "200px" }} className='shadow'>
      <div style={{ height: "50px", width: "200px",}}>  <img src={teacherimg} alt="" />  </div>
      <div style={{ height: "100px", width: "200px",}} className='fw-bold fs-5 text-primary'> Total Teachers {teacher && teacher.length}</div>
        </div>

        </div>


        






        </div>



        </div>
    </>

  )
}

export default Home