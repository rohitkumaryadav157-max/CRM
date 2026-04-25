import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

function Manlayout() {
  return (
   <>
   
   <div className="container-fluid body">

<Navbar 
        admin="/manager/"
        visitor="/manager/visitor"
        enquiry="/manager/viewenq"
        addenq='/manager/addenq'
      />


    <Outlet/>


   </div>
   
   
   </>
  )
}

export default Manlayout