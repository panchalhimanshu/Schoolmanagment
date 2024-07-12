import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Errorpage from './Errorpage'
import Studentdashboard from './Teacherdashboard/Teacherdashboard'
import Studentprofile from './Teacherdashboard/Teacherprofile'
import Assignment from './Teacherdashboard/Assignment'

export const studentdetailsprovide = createContext()

function App() {

  // const [studentdetails, setstudentdetails] = useState('')

  const studentinfo = localStorage.getItem("teacherinfo")

  return (
    <>  
      <BrowserRouter>

      {/* <studentdetailsprovide.Provider value={{ studentdetails, setstudentdetails }}> */}
            <Routes>
            <Route path='/' element={<Login />}></Route>
            {studentinfo &&   <Route path='/studentdashboard' element={<Studentdashboard />}></Route> }
            {studentinfo &&    <Route path='/studentprofile' element={<Studentprofile />}></Route> }
            {/* {studentinfo && <Route path='/studentcomplain' element={<Studentcomplain />}></Route> } */}
            {studentinfo && <Route path='/assignment' element={<Assignment />}></Route> }
            <Route path='*' element={<Errorpage />}></Route>
            </Routes>
      {/* </studentdetailsprovide.Provider> */}
      </BrowserRouter>
    </>
  )
}

export default App
