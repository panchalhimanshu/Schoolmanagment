import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function StudentComplain() {
    const [email, setEmail] = useState("");
    const [date, setDate] = useState(getCurrentDate()); // Initialize with current date
    const [complain, setComplain] = useState("");
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(config.baseUrl + "students")
            .then((res) => res.json())
            .then((data) => setStudents(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const student = students.find((student) => student.email === email);
        if (student) {
            const { _id } = student;
            fetch(`${config.baseUrl}students/${_id}`, {
                method: "put",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ date, complain })
            })
                .then((res) => {
                    if (res) {
                        alert("submit complain")
                        window.location.reload()
                    }
                })
                .then((data) => console.log(data))
                .catch((error) => console.error('Error:', error));



        } else {
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
  

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="border border-1 pt-2 p-4">
              <h1 className="text-center text-success mb-4">Student Complain</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date:</label>
                  <input type="datetime-local" className="form-control" id="date" value={date} readOnly />
                </div>
                <div className="mb-3">
                  <label htmlFor="complain" className="form-label">Complain:</label>
                  <textarea className="form-control" id="complain" rows="3" value={complain} onChange={(e) => setComplain(e.target.value)}></textarea>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    );
}

export default StudentComplain;
