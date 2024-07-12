import React, { useEffect, useState } from 'react'
import config from '../config';

function Assignment() {

  const [assdata, setassdata] = useState([]);
    const student =  localStorage.getItem("studentinfo")
  const studentdetails = JSON.parse(student)

    useEffect(() => {
    
        fetch( config.baseUrl + "images/" + studentdetails.schoolid)
          .then((res) => res.json())
          .then((data) => setassdata(data.filter((v) => v.standard == studentdetails.standard)));

      }, []);

  return (
    <div>
         <div className="col-md-6">
          <h2 className="mb-3 text-center">Assignment</h2>
          <div className="d-flex flex-wrap justify-content-center gap-2 ">
            {assdata && assdata.map((image) => (
              <div key={image._id} className="image-item mb-3 border border-secondary pb-2">
                <img src={`data:image/jpeg;base64,${image.data}`} alt={image.originalname} style={{ height: '100px', width: '100%' , objectFit:"cover"}} />
                {/* <p>{image.originalname}</p> */}
                <p className='pt-2 px-2'> Subject : { image.subject && image.subject} </p>
                {image.originalname.slice(-3) === "pdf" ?
                  <a href={`data:application/pdf;base64,${image.data}`} download>Download PDF</a> :
                  <a href={`data:image/jpeg;base64,${image.data}`} download><button className="btn btn-primary d-block m-auto">Download</button></a>
                }
              </div>
            ))}
          </div>
        </div>

    </div>
  )
}

export default Assignment