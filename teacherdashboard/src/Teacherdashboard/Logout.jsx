import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate =  useNavigate()
    const handleclick = ()=>{
        localStorage.removeItem("teacherinfo")
        navigate("/")
    }
  return (
    <div>
        <button className='btn btn-danger'  onClick={handleclick}>Logout</button>
    </div>
  )
}

export default Logout