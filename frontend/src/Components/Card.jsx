import React from "react";

function CenterCard({title, assigned, followups, enquiries}) {
  return (
    <div className="card p-3 ">

      <h6 className="mb-3">{title}</h6>

      

      <div className="row text-center mb-3">

        <div className="col-6 border rounded p-2">
          <h5>{assigned}</h5>
          <small>Assigned</small>
        </div>

        <div className="col-6 border rounded p-2">
          
          <h5>{followups}</h5>
          <small>Follow-ups</small>
        </div>

      </div>

      <div className="border rounded p-2 mb-3">
        <h5 className="text-warning">{enquiries}</h5>
        <small>Enquiries</small>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-warning text-white">
          Open Enquiries
        </button>

        <button className="btn btn-light border">
          Timeline
        </button>
      </div>

      <div className="text-dark">No recent follow-ups</div>

{/*SCROLLABLE SECTION */}

    <div 
  className="mt-3"
  style={{ maxHeight: "200px", overflowY: "auto" }}
>
  <div className="border rounded p-2 mb-2">
    <h6>Mayank Pal</h6>
    <small>by Akshat Pathak • 18 Feb, 11:17 AM</small>
    <div className="text-success">Registered</div>
  </div>

  <div className="border rounded p-2 mb-2">
    <h6>Mayank Pal</h6>
    <small>by Akshat Pathak • 18 Feb, 11:16 AM</small>
    <div className="text-primary">Hot Enquiry</div>
  </div>


  <div className="border rounded p-2 mb-2">
    <h6>Mayank Pal</h6>
    <small>by Akshat Pathak • 18 Feb, 11:17 AM</small>
    <div className="text-success">Registered</div>
  </div>


  <div className="border rounded p-2 mb-2">
    <h6>Mayank Pal</h6>
    <small>by Akshat Pathak • 18 Feb, 11:17 AM</small>
    <div className="text-success">Registered</div>
  </div>
</div>





    </div>
  )
}

export default CenterCard
