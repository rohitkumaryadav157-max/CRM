import axios from "axios";

import React, { useEffect, useState } from "react";

function Adviewenq() {

  const [remark,setRemark] = useState('');
  const [enq, setEnq] = useState([]);
  const [uid, setUid] = useState('');
  const [filterUser, setfilterUser] = useState([]);
  
  const getenq = async () => {
    const response = await axios.get("http://localhost:3000/api/enq");
    console.log(response);
    if (response.data.msg == "success") {
      setEnq(response.data.enq);
    }
  };

  useEffect(() => {
    getenq();
    getuser();
  }, []);

//code for take user value to modale 
  const [user,setUser] = useState([]);
  const getuser = async ()=> {
    const res = await axios.get('http://localhost:3000/api/user');
    if(res.data.msg=="success"){
        setUser(res.data.user);
    }
  }

  // code for delete the user
  const delenq = async (id) => {
    const res = await axios.delete(`http://localhost:3000/api/enq/${id}`);
    if (res.data.msg == "User deleted successfully") {
      window.alert("data delete succesfull");
      getenq();
    }
  };

  //edit the student enquiry
  const [editId, setEditid] = useState(null);
  const updateenq = async (e) => {
    e.preventDefault();
    const d = Date();
    const data={'assignto':uid,'assignby':localStorage.getItem('admin'),assigndate:d};
    
    const res = await axios.put(`http://localhost:3000/api/enq/${editId}`,data);

    const assigndata ={'enqid':editId,'assignto':uid,'assignby':localStorage.getItem('admin'),'assignModel':'admin','remark':remark};
    const res2 = await axios.post('http://localhost:3000/api/assign',assigndata)
    
    if (res.data.msg == "User updated successfully" && res2.data.msg=="success") {
      window.alert("Student Update Success✅ " );
      setEditid(null);
     setUid('');
     setRemark('');
     getenq();
    } else {
      window.alert("something went wrong");
    }
  };



  //for open modal by click row 

  const [selectedEnq,setSelectenq]= useState('');

  const handleRowClick = (data) => {
    setSelectenq(data);
    setEditid(data._id);

    const modal = new window.bootstrap.Modal(document.getElementById('exampleModal1'));
    modal.show();


};


const assignfun = (e)=>{
  console.log(e);
  setEditid(e._id);
  var fu = user.filter((u)=>{
    return u.center == e.center && u.status=='u';
  });
  console.log("filtered user:",fu);
  setfilterUser(fu);
}


  return (
    <>
      <h4>View All Enquires</h4>
     <div className="table-responsive">
       <table className="table table-dark table-bordered">
        <thead>
          <tr>

            <th>Sno.</th>
            <th>Date</th>
            <th>Action</th>
            <th>Source</th>
            <th>Name</th>
            <th>College</th>
            <th>Center</th>
            <th>For Programme</th>
            <th>Assigned to</th>
            <th>Status</th>
            <th>Next Follow-up</th>
          </tr>
        </thead>

        <tbody>


          {enq.map((e, i) => (
           <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }} >

               {/* Sno. data In TBALE */ }
              <td>{i + 1}</td>

               {/*DATE data In TBALE */ }
              <td>{e.createdAt.split("T")[0]}</td>

                {/* ACTION work In TBALE three option whatapp; delete; assignto  START */ }
              <td>

                <a
                  href={`https://api.whatsapp.com/send?phone=${e.contact}`}
                  target="_blank"
                  className="btn btn-outline-success mx-2" onClick={e=>e.stopPropagation()}
                >
                  WA
                </a>
                <button className="btn btn-primary"onClick={e=>e.stopPropagation()} >Copy</button>

                <div class="dropdown d-inline p-2">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={e=>e.stopPropagation()}
                  >
                    .....
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button
                  onClick={(e) => {
                    delenq(e._id);
                    e.stopPropagation()
                  }}

                >
                  {" "}
                  <i className="fa fa-trash text-danger"></i>{" "}
                </button>
                    </li>
                    <li>
                      <>



  {/* Buttons */}

  {e.status=="u" && <button
    type="button"
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@getbootstrap"
    onClick={(c)=>{setEditid(e._id);
      c.stopPropagation();
      assignfun(e);
    }}
  >
    Assign
  </button>}

  {/* Modal */}
  
</>
                    </li>
                   
                  </ul>
                </div>
              </td>
       {/* ACTION work In TBALE three option whatapp; delete; assignto  START */ }

       
                  <td>Not given   </td>

              <td>
                
                <b> {e.fullName}</b>
                <br />
                {e.contactNumber} <br />
                {e.course}
              </td>

              <td>{e.college}</td>
              <td>{e.center}</td>
              <td>{e.ForProgramme || "_"}</td>
              <td>{e.assignto? e.assignto.name:"Not Assigned"}</td>
              <td>{e.status=="u"?"Active":"Deactive"}</td>
              <td>{e.Nextfollowup || "_"}</td>
             
              
             

              

              
            </tr>
          ))}
        </tbody>
      </table>
     </div>

      <div
    className="modal fade"
    id="exampleModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Assign Enquiry
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

          <form onSubmit={updateenq}> 
        <div className="modal-body">
          
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Assign / TransforTo
              </label>
              {/* <input type="text" value={editId} /> */}
          <select className="form-control" id="" value={uid} onChange={(e)=>setUid(e.target.value)}>
          <option value="">--Not Assigned--</option>
          {
            filterUser.map((u)=>(
                <option key={u._id} value={u._id}>{u.name}  {u.role=="manager"?"Manager":"Councelor"} </option>
            ))
          }

          </select>
              
            </div>

            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
               Note /optional
              </label>
              <textarea value={remark} onChange={(e)=>setRemark(e.target.value)}
                className="form-control"
                id="message-text"
              ></textarea>
            </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            >
            Close
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            
            >
            Assign
          </button>
        </div>
              </form>

      </div>
    </div>
  </div>




  {/*Modal START of row by click row  */}




            <div className="modal fade" id="exampleModal1" tabIndex="-1">
  <div className="modal-dialog modal-xl modal-dialog-centered">
    <div className="modal-content">

      {/* HEADER */}
      <div className="modal-header">
        <div>
          <h5 className="modal-title">
            Enquiry #{selectedEnq?._id?.slice(-4)} - {selectedEnq?.fullName}
          </h5>
          <small className="text-muted">
            {selectedEnq?.course} • {selectedEnq?.center}
          </small>
        </div>
        <button className="btn-close" data-bs-dismiss="modal"></button>
      </div>

      {/* FILTER SECTION */}
      <div className="px-3 pt-2 d-flex gap-2">
        <input type="date" className="form-control" />
        <input type="date" className="form-control" />
        <button className="btn btn-warning">Apply Date Filter</button>
        <button className="btn btn-outline-secondary">Reset</button>
      </div>

      {/* STATUS CARDS */}
      <div className="row px-3 mt-3">
        <div className="col-md-3">
          <div className="card p-2">
            <small>Assigned To</small>
            <b>{selectedEnq?.assignto?.name || "Not Assigned"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Status</small>
            <b>{selectedEnq?.status || "New"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Next Follow-up</small>
            <b>{selectedEnq?.nextfollowupdate || "-"}</b>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2">
            <small>Total Followups</small>
            <b>0</b>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="row p-3">

        {/* LEFT SIDE - USER INFO */}
        <div className="col-md-5">
          <div className="card p-3">
            <h5>
              {selectedEnq?.fullName}
              <span className="badge bg-warning ms-2">New</span>
            </h5>

            <hr />

            <p><b>Mobile:</b> {selectedEnq?.contactNumber}</p>
            <p><b>Email:</b> {selectedEnq?.email}</p>
            <p><b>Course:</b> {selectedEnq?.course}</p>
            <p><b>Center:</b> {selectedEnq?.center}</p>
            <p><b>Created:</b> {selectedEnq?.createdAt?.split("T")[0]}</p>

            <div className="d-flex gap-2 mt-3">
              <a
                href={`tel:${selectedEnq?.contactNumber}`}
                className="btn btn-outline-primary w-50"
              >
                Call
              </a>

              <a
                href={`https://api.whatsapp.com/send/?phone=${selectedEnq?.contactNumber}`}
                target="_blank"
                className="btn btn-outline-success w-50"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - TIMELINE */}
        <div className="col-md-7">
          <div className="card p-3">
            <div className="d-flex justify-content-between">
              <h6>Follow-up Timeline</h6>
              <button className="btn btn-sm btn-outline-secondary">Refresh</button>
            </div>

            <p className="text-muted mt-3">
              No follow-ups in selected range.
            </p>
          </div>
        </div>

      </div>

      {/* ASSIGN SECTION */}
      <form onSubmit={updateenq}>
        <div className="p-3 border-top">

          <div className="row">
            <div className="col-md-6">
              <label>Assign To</label>
              <select
                className="form-control"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
              >
                <option value="">-- Not Assigned --</option>
                {filterUser.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <label>Note</label>
              <textarea
                className="form-control"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="text-end mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Assign Enquiry
            </button>
          </div>

        </div>
      </form>

    </div>
  </div>
</div>

{/*. Modal end */}


    </>
  );
}

export default Adviewenq;
