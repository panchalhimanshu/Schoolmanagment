import React, { createContext, useState } from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Student from './student/Student.jsx'
import Teacher from './teacher/Teacher.jsx'
import Newstudent from './student/Newstudent.jsx'
import Studentdashboard from './student/Studentdashboard.jsx'
import Teacherdashboard from './teacher/Teacherdashboard.jsx'
import Newteacher from './teacher/Newteacher.jsx'
import Home from './Home.jsx'
import Studentdetails from './student/Studentdetails.jsx'
import Teacherdetails from './teacher/Teacherdetails.jsx'
import Studentcomplain from './student/Studentcomplain.jsx'
import Ass from './Assignmet/Assupload.jsx'
import Errorpage from './Errorpage.jsx'
import Complain from './Complain/Complain.jsx'
import Studentedit from './student/StudentEdit.jsx'
import Teacheredit from './teacher/Teacheredit.jsx'
import Assignmentdashboard from './Assignmet/Assignmentdashboard.jsx'
import Assignmentshow from './Assignmet/Assignmentshow.jsx'
import Logrg from './Logrg.jsx'
import Adminlogin from './Adminlogin.jsx'
import Adminregister from './Adminregister.jsx'
export const studentdetailsprovide = createContext()
export const teacherdetailsprovide = createContext()


function App() {

  const [studentdetails, setstudentdetails] = useState([])
  const [teacherdetails, setteacherdetails] = useState([])
  const [x, setx] = useState("student")

  var admintinfo = localStorage.getItem('admintinfo');

  const admindetail =  JSON.parse(admintinfo)

  return (
    <div className=''>
      <BrowserRouter>
        <studentdetailsprovide.Provider value={{ studentdetails, setstudentdetails }}>
          <teacherdetailsprovide.Provider value={{ teacherdetails, setteacherdetails }}>
            <Routes>
              <Route path='/' element={<Logrg />}></Route>
              <Route path='/adminlogin' element={<Adminlogin />}></Route>
              <Route path='/admintregister' element={<Adminregister />}></Route> 
           { admindetail  && <Route path='/admindashboard' element={<Home />}></Route> }
             { admindetail  && <Route path='/student/:sid' element={<Student />}></Route> }
             { admindetail  && <Route path='/studentdashboard' element={<Studentdashboard />}></Route> }
             { admindetail  && <Route path='/newstudent' element={<Newstudent />}></Route> }
             { admindetail  && <Route path='/teacher/:sid' element={<Teacher />}></Route> }
             { admindetail  && <Route path='/teacherdashboard' element={<Teacherdashboard />}></Route> }
             { admindetail  && <Route path='/newteacher' element={<Newteacher />}></Route> }
             { admindetail  && <Route path='/studentdetails' element={<Studentdetails />}></Route> }
             { admindetail  && <Route path='/teacherdetails' element={<Teacherdetails />}></Route> }
             { admindetail  && <Route path='/studentcomplain' element={<Studentcomplain />}></Route> }
             { admindetail  && <Route path='/students/:eid' element={<Studentedit/>}></Route> }
             { admindetail  && <Route path='/teacheredit/:eid' element={<Teacheredit/>}></Route> }
             { admindetail  && <Route path='/ass' element={<Ass />}></Route> }
             { admindetail  && <Route path='/assignment' element={<Assignmentdashboard />}></Route> }
             { admindetail  && <Route path='/assigments/:sid' element={<Assignmentshow />}></Route> }
             { admindetail  && <Route path='/Complain/:sid' element={<Complain />}></Route> }
             <Route path='/*' element={<Errorpage />}></Route> 
            </Routes>
          </teacherdetailsprovide.Provider>
        </studentdetailsprovide.Provider>
      </BrowserRouter>
    </div>
  )
}

export default App