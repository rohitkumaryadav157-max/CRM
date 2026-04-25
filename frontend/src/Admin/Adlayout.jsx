import React from 'react'
import { Link,Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
function Adlayout() {
  return (


    <>
   
   <div className="container-fluid body">


    
     <Navbar 
        admin="/admin/"
        visitor="/admin/visitor"
        enquiry="/admin/viewenq"
        user='/admin/user'
        center='/admin/center'
        addenq='/admin/addenq'
      />



    {/* <br/>

    <br/> */}

    <div className='mt-5'>

    <Outlet/>

    </div>

    </div>
    </>
  )
}

export default Adlayout