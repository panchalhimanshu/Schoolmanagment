import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Studentcomplain from './Studentdashboard/Studentcomplain'
import Studentdashboard from './Studentdashboard/Studentdashboard'
import Studentprofile from './Studentdashboard/Studentprofile'
import Errorpage from '../Errorpage'
import Assignment from './Studentdashboard/Assignment'

export const studentdetailsprovide = createContext()

function App() {

  // const [studentdetails, setstudentdetails] = useState('')

  const studentinfo = localStorage.getItem("studentinfo")

  return (
    <>  
      <BrowserRouter>

      {/* <studentdetailsprovide.Provider value={{ studentdetails, setstudentdetails }}> */}
            <Routes>
            <Route path='/' element={<Login />}></Route>
            {studentinfo &&   <Route path='/studentdashboard' element={<Studentdashboard />}></Route> }
            {studentinfo &&    <Route path='/studentprofile' element={<Studentprofile />}></Route> }
            {studentinfo && <Route path='/studentcomplain' element={<Studentcomplain />}></Route> }
            {studentinfo && <Route path='/assignment' element={<Assignment />}></Route> }
            <Route path='*' element={<Errorpage />}></Route>
            </Routes>
      {/* </studentdetailsprovide.Provider> */}
      </BrowserRouter>
    </>
  )
}

export default App
