import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import emailjs from '@emailjs/browser';


function NewStudent() {


    var admintinfo = localStorage.getItem('admintinfo');

    const admindetail =  JSON.parse(admintinfo)
    
    const [surname, setSurname] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [rollno, setrollno] = useState("");
    const [zender, setGender] = useState("male");
    const [birthdate, setBirthdate] = useState("");
    const [password, setpassword] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [schoolid, setschoolid] = useState(admindetail._id);
    const [standard, setStandard] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fname && lname && surname && email && zender && birthdate && rollno && phonenumber && password && standard && age) {
            fetch(config.baseUrl + "students", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ surname, fname, lname, zender, age, birthdate,rollno, schoolid , phonenumber,password, standard, email })
            })
                .then((res) => res.json())
                .then((data) => {
                    alert(" Name " + " : "  + surname + " " + fname + " " + lname)
                    setSurname('')
                    setFname('')
                    setLname('')
                    setEmail('')
                    setrollno('')
                    setGender('')
                    setBirthdate('')
                    setPhoneNumber('')
                    setStandard('')
                    setAge("")
                    sendEmail();
                    setpassword("")
                })
                .catch((error) => console.error('Error:', error));
        } else {
            alert("Please fill in all fields");
        }
    };

    const sendEmail = () => {
        emailjs.sendForm('service_i08qgro', 'template_bov46ed', document.getElementById('hiddenForm'), 'cVRagEg7uewkGgxJO')
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="container my-5 w-50 mx-auto border border-1 py-2 pb-4 shadow">
            <h1 className="text-center text-success mb-4">New Student</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Surname:</label>
                    <input type="text" className="form-control" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fname" className="form-label">First Name:</label>
                    <input type="text" className="form-control" id="fname" value={fname} onChange={(e) => setFname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="lname" className="form-label">Last Name:</label>
                    <input type="text" className="form-control" id="lname" value={lname} onChange={(e) => setLname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender:</label>
                    <select className="form-select" id="gender" value={zender} onChange={(e) => setGender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">Roll No:</label>
                    <input type="text" className="form-control" id="birthdate" value={rollno} onChange={(e) => setrollno(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="standard" className="form-label">Standard:</label>
                    <input type="text" className="form-control" id="standard" value={standard} onChange={(e) => setStandard(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
                    <input type="text" className="form-control" id="phoneNumber" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="phoneNumber" value={password} onChange={(e) => setpassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>




            <form id="hiddenForm" style={{ visibility: "hidden" }}>
                <label>Name</label>
                <input type="text" name="user_name" value={surname + " " + fname + " " + lname} readOnly />
                <label>Email</label>
                <input type="email" name="user_email" value={email} readOnly />
                <input type="password" name="user_password" value={password} readOnly />
                <input type="submit" value="Send" />
            </form>
            
        </div>
    );
}

export default NewStudent;
