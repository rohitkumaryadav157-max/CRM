import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'
function Counselorlayout() {
  return (
   <>
   
   
   <div className="container-fluid body">

<Navbar 
        admin="/counselor/"
        visitor="/counselor/visitor"
        enquiry="/counselor/viewenq"
        addenq='/counselor/addenq'
      />


    <Outlet/>


   </div>
   
   
   
   
   
   
   
   </>
  )
}

export default Counselorlayout