import React, { useState } from 'react'
import config from './config';
import { useNavigate } from 'react-router-dom';

function Adminregister() {


    const [fullname, setfullname] = useState("");
    const [schoolname, setschoolname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
   const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault();
        if (fullname  && email  && password && schoolname ) {
            fetch(config.baseUrl + "admin", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ fullname,password, email , schoolname })
            })
                .then((res) => res.json())
                .then((data) => {
                    alert("Register successfull")
                    setfullname(" ")
                    setEmail(" ")
                    setpassword("")
                    setschoolname(' ')
                    navigate("/adminlogin")
                })
                .catch((error) => console.error('Error:', error));
        } else {
            alert("Please fill in all fields");
        }
    };

  return (
    <div className="container my-5 w-50 mx-auto border border-1 py-2 pb-4 shadow">
            <h1 className="text-center text-success mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">User Name:</label>
                    <input type="text" className="form-control" id="fname" value={fullname} onChange={(e) => setfullname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">School name:</label>
                    <input type="text" className="form-control" id="phoneNumber" value={schoolname} onChange={(e) => setschoolname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="phoneNumber" value={password} onChange={(e) => setpassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
  )
}

export default Adminregister