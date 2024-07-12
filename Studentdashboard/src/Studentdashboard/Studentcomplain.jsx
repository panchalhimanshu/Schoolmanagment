import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Studentcomplain() {

  const studentx =  localStorage.getItem("studentinfo")
  const studentdetails = JSON.parse(studentx)

    const [email, setEmail] = useState(studentdetails.email);
    const [date, setDate] = useState(getCurrentDate()); // Initialize with current date
    const [complain, setComplain] = useState("");
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch( config.baseUrl+"students/" + studentdetails.schoolid)
            .then((res) => res.json())
            .then((data) => setStudents(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const student = students.find((student) => student.email === email);
        if (student && complain) {
            const { _id } = student;
            fetch(`${config.baseUrl}students/${_id}`, {
                method: "put",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ date, complain  })
            })
                .then((res) => {
                    if (res) {
                        toast.success("Submit Complain")
                        setComplain(" ")
                    }
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error:', error));
        }
        else if (complain == ""){
              alert("complain")
        }
         else {
            alert("No student found with the provided email ID");
        }
    };

    function getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      let month = today.getMonth() + 1;
      let day = today.getDate();
      let hours = today.getHours();
      let minutes = today.getMinutes();
      let seconds = today.getSeconds();
  
      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      if (seconds < 10) seconds = '0' + seconds;
  
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }


  const handleclick = ()=>{
      localStorage.removeItem("studentinfo")
      navigate("/")
  }
  

    return (
<div className="p-3 p-md-5" style={{ background: "#020237", minHeight: "100vh" }}>
    <div className="d-flex justify-content-between align-items-center mb-4">
        <button className='btn btn-warning' onClick={()=>navigate("/studentdashboard")}>Back</button>
        {/* <button className='btn btn-danger' onClick={handleclick}>Logout</button> */}
    </div>
    
    <div className="row justify-content-center mx-auto mt-5">
        <div className="col-12 col-lg-6">
            <div className=" p-4 bg-white">
                <h1 className="text-center text-success mb-4">Student Complain</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" className="form-control" id="email" value={email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date:</label>
                        <input type="datetime-local" className="form-control" id="date" value={date} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="complain" className="form-label">Complain:</label>
                        <textarea className="form-control" id="complain" rows="3" value={complain} onChange={(e) => setComplain(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Submit</button>
                </form>
            </div>
        </div>
    </div>
    <ToastContainer position="top-center" autoClose={1000} />

</div>

     
      
    );
}

export default Studentcomplain;
