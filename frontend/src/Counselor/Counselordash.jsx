import React from 'react'
import './counselor.css'
import CenterCard from '../Components/Card'
function Counselor() {
  return (
    // <div> Welcome Counselor Dashboard process..</div>


    <>
    


     <div className="container-fluid body">

          


           



      

{/* header section START */}
        <div className="row box2 shadow">

                                <div className="col-4 ">
                                       <div className="fw-bolder fs-4 smallpara1">Complete Reports </div> <br/>
                                       <div className="smallpara "> Quick snapshort of progress -what you did & what's next </div>
                                </div>

                                <div className="col-2 header ">
                                       <select className="form-select">
        <option>2026</option>
        <option>2025</option>
        <option>2024</option>
        <option>2024</option>
      </select>
                                </div>

                                <div className="col-6  box3">
                                        <input type="date"  className="mx-3 rounded"/>

                                         <input type="date"  className="mx-3 rounded"/>

                                         <button className="btn  mx-3 text-white " style={{backgroundColor:"orange"}}>Apply </button>

                                         <button className="btn text-dark border mx-3">Reset</button>
                                </div>

                            </div>

                        
   {/* header section END */}





<br/>
<br/>

 {/* AFter header section start */}




                          <div className="row">
  
    

                <div className="col-8">
  <div className="card p-3">

    {/* Top Welcome Section */}
    <div className="d-flex justify-content-between align-items-center">

      {/* Left Side */}
      <div>
        <p className="mb-1 fw-bolder fs-5">Welcome, <strong> Counselor 👨🏻‍💻👨🏻‍💻.. </strong></p>
        <h6 className="text-muted">Overview</h6>
        <h3>25 <span className="fs-6">enquiries</span></h3>
      </div>

      {/* Right Side */}
      <div style={{width:"300px"}}>
        <div className="d-flex justify-content-between">
          <span>Assigned</span>
          <span>Progress</span>
        </div>

        <div className="d-flex align-items-center mt-2">
          <h4 className="me-3">3</h4>

          <div className="progress w-100" style={{height:"8px"}}>
            <div
              className="progress-bar bg-success"
              style={{width:"12%"}}
            ></div>
          </div>
        </div>

        <small className="text-muted">12% assigned</small>
      </div>

    </div>

    {/* Bottom Cards */}
    <div className="row mt-4">

      <div className="col-3">
        <div className="card p-3">
          <p className="mb-1">Today's follow-ups</p>
          <h3>0</h3>
          <small className="text-danger">Overdue: 2</small>
        </div>
      </div>

      <div className="col-3">
        <div className="card p-3">
          <p className="mb-1">Workshop students</p>
          <h3>0</h3>
          <small className="text-muted">Recent: 0</small>
        </div>
      </div>

      <div className="col-3">
        <div className="card p-3">
          <p className="mb-1">Registered</p>
          <h3>2</h3>
          <small className="text-muted">Total conversions</small>
        </div>
      </div>

      <div className="col-3">
        <div className="card p-3">
          <p className="mb-1">Centers</p>
          <h3>4</h3>
          <small className="text-muted">Active centers</small>
        </div>
      </div>

    </div>

  </div>
</div>


<div className="col-4">
  <div className="card p-3">

    {/* Header */}
    <div className="d-flex justify-content-between mb-3">
      <h5 className="fw-bold">Action Items</h5>
      <span className="text-muted">What to do next</span>
    </div>

    {/* First Row */}
    <div className="border rounded p-3 mb-3 d-flex justify-content-between align-items-center">

      <div className="d-flex align-items-center">
        <div className="me-3 text-muted">Leads</div>

        <div>
          <h6 className="mb-1 fw-bold">3 assigned</h6>
          <small className="text-muted">
            Assigned across your centers
          </small>
        </div>
      </div>

      <button className="btn btn-light border">
        View Enquiries
      </button>

    </div>

    {/* Second Row */}
    <div className="border rounded p-3 d-flex justify-content-between align-items-center">

      <div className="d-flex align-items-center">
        <div className="me-3 text-muted">Today</div>

        <div>
          <h6 className="mb-1 fw-bold">0 calls due</h6>
          <small className="text-muted">
            Prioritise overdue first
          </small>
        </div>
      </div>

      <button className="btn btn-warning text-white">
        Start Calls
      </button>

    </div>

  </div>
</div>








                            </div>









 {/* AFter header section END */}


 {/* Dashboard section start in 3-part  */}
<div className="row mx-2">


    <div className="col-4">.   <CenterCard />      </div>
    <div className="col-4"></div>
    <div className="col-4"></div>
</div>

 {/* Dashboard section END in 3-part  */}



{/*FOOTER SECTION  START*/}
        <footer className="text-center mt-5 text-secondary small footer">
          2025 © Copyright Softpro India Computer Technologies (P) Ltd. All rights Reserved.
        </footer>

{/*FOOTER SECTION  END*/}
     </div>

    

    
    


    
    
    </>
  )
}

export default Counselor



