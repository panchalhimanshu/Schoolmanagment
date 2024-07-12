import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config';

function Studentedit() {

    var admintinfo = localStorage.getItem('admintinfo');

    const admindetail =  JSON.parse(admintinfo)


    const { eid } = useParams();
    const [surname, setSurname] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [rollno, setrollno] = useState("");
    const [zender, setzender] = useState("male");
    const [birthdate, setBirthdate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [standard, setStandard] = useState("");
    const [age, setAge] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (eid) {
            fetch(`http://localhost:2000/studentss/${eid}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setSurname(data[0].surname);
                    setFname(data[0].fname);
                    setLname(data[0].lname);
                    setEmail(data[0].email);
                    setzender(data[0].zender);
                    setrollno(data[0].rollno);
                    setBirthdate(data[0].birthdate);
                    setPhoneNumber(data[0].phonenumber);
                    setStandard(data[0].standard);
                    setAge(data[0].age);
                })
                .catch((error) => console.error('Error:', error));
        }
    }, [eid ]);

    const handleSubmit = (e) => {
        e.preventDefault();
            const url = `http://localhost:2000/students/${eid}`;

            fetch(url, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({surname, fname, lname, zender,rollno, age, birthdate, phonenumber: phoneNumber, standard, email })
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    navigate('/student/' + admindetail._id);
                })
                .catch((error) => console.error('Error:', error));
    };

    return (
        <div className="container mt-5 w-50 mx-auto border border-1 pt-2 shadow">
            <h1 className="text-center text-success mb-4">Edit Student</h1>
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
                    <label htmlFor="lname" className="form-label">Roll No:</label>
                    <input type="text" className="form-control" id="lname" value={rollno} onChange={(e) => setrollno(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="zender" className="form-label">zender:</label>
                    <select className="form-select" id="zender" value={zender} onChange={(e) => setzender(e.target.value)}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="birthdate" className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
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
                    <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    );
}

export default Studentedit;

// import React from 'react'

// function StudentEdit() {
//   return (
//     <div>StudentEdit</div>
//   )
// }

// export default StudentEdit
