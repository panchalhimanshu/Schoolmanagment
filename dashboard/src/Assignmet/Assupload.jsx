import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function AssignmentUploader() {
  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)
  const [schoolid, setschoolid] = useState(admindetail._id);

  const [selectedFile, setSelectedFile] = useState(null);
  const [standard, setStandard] = useState('');
  const [subject, setsubject] = useState('');
  const [date, setdate] = useState(getCurrentDate());

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleStandardChange = (e) => {
    setStandard(e.target.value);
  };
  const handlesubjectChange = (e)=>{
    setsubject(e.target.value);
  }

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


  const handleUpload = async () => {
    try {
     if(selectedFile && standard && subject)
      {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('standard', standard);
        formData.append('subject', subject);
        formData.append('date', date);
        formData.append('schoolid', schoolid);

        await axios.post(config.baseUrl+'upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert(`Uploaded assignment for standard ${standard}`);
        console.log('Image uploaded successfully');
        window.location.reload()
      }
      else
      {
        alert("fill")
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="mb-4">Upload Assignment</h2>
        <div className="mb-3">
          <label htmlFor="standardInput" className="form-label">Standard:</label>
          <input
            type="text"
            id="standardInput"
            className="form-control"
            placeholder="Enter standard..."
            value={standard}
            onChange={handleStandardChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="standardInput" className="form-label">Subject:</label>
          <input
            type="text"
            id="subjectInput"
            className="form-control"
            placeholder="Enter standard..."
            value={subject}
            onChange={handlesubjectChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Choose File:</label>
          <input
            type="file"
            id="fileInput"
            className="form-control"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png, .pdf"
          />
        </div>
        <button onClick={handleUpload} className="btn btn-primary">Upload</button>
      </div>
    </div>
  );
}

export default AssignmentUploader;
