import React, { useEffect, useState } from 'react'
import config from '../config';
import { useParams } from 'react-router-dom';

function Assignmentshow() {

const [data, setdata] = useState([])
const {sid} =  useParams()

    useEffect(()=>{

        fetch( config.baseUrl + "images/" + sid)
        .then((res) => res.json())
        .then((data) => setdata(data));

    },[])

    const handleDelete = (id) => {
        fetch(config.baseUrl + "upload/" + id, {
            method: "delete",
            headers: { "content-type": "application/json" }
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
        window.confirm();
        window.location.reload();
    };


  return (
    <div className="container mt-5">
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Assignment</th>
                <th>Standard</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data && data.map((image) => (
                <tr key={image._id} className="image-item">
                    <td>{image.originalname}</td>
                    <td>{image.standard}</td>
                    <td>{image.subject}</td>
                    <td>{image.date}</td>
                    <td>
                        {image.originalname.slice(-3) === "pdf" ?
                            <a href={`data:application/pdf;base64,${image.data}`} download className="btn btn-primary mx-1">Download PDF</a> :
                            <a href={`data:image/jpeg;base64,${image.data}`} download className="btn btn-primary mx-1">Download</a>
                        }
                         <button className='btn btn-danger ms-2' onClick={() => handleDelete(image._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

  )
}

export default Assignmentshow