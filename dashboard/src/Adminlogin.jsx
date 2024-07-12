import React, { useContext, useState } from 'react';
import { studentdetailsprovide } from './App';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import config from './config';


function Adminlogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const {setstudentdetails} = useContext(studentdetailsprovide)

    const navigate =  useNavigate()

    const handleSubmit = (e) => {
       
        e.preventDefault();

        fetch(config.baseUrl + "adminlogin").then((res)=>res.json()).then((data)=>
        {
           const student = data.find((v)=> v.email == email && v.password == password)
           if(student)
            {
                localStorage.setItem("admintinfo" , JSON.stringify(student))
                toast.success("Login succesefully")
                
              setTimeout(() => {
                navigate("/admindashboard")
              }, 5000);
            }
            else
            {
                alert("wrong email")
            }
        })
        
    };


    return (
        <div className="border rounded-lg" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#020237" }}>
        <ToastContainer position="top-center" />

        <div className="bg-white p-5 rounded-lg">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary "
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ?<FaEye />: <FaEyeSlash />}
                        </button>
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    </div>

    
   
    );
}

export default Adminlogin;


