import axios from "axios";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Couviewenq() {

const [rem,setRem] = useState('');
const [d,setd] = useState(true);
  const [enq, setEnq] = useState([]);
  const [uid, setUid] = useState('');
   

  //code for filter enquiry  according location of counselor by which he/she will login 
  const getenq = async () => {
    const response = await axios.get("http://localhost:3000/api/enq");
    const response2 = await axios.get(`http://localhost:3000/api/user/${localStorage.getItem('counseler')}`)
    // console.log(response);
    if (response.data.msg == "success" && response2.data.msg =="success") {
      console.log(response.data.enq);
      var enquires = response.data.enq.filter((a)=>{
        return a.assignto ? a.assignto._id ==localStorage.getItem('counseler'): a.center == response2.data.user.center;
      })
      console.log(enquires);
      setEnq(enquires);
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



    const assigndata ={'enqid':editId,'assignto':uid,'assignby':localStorage.getItem('user'),'assignModel':'user','remark':rem};

    const res2 = await axios.post('http://localhost:3000/api/assign',assigndata)

    


    if (res.data.msg == "User updated successfully"&& res2=="success") {
      window.alert("Student Update Success✅" );
      setEditid(null);
     setUid('');
     setRem('');
     getenq();
    } else {
      window.alert("something went wrong");
    }
  };


  //touching row modal(off-canva) from right 


 const [selectedEnq, setSelectedEnq] = useState(null);
  const handleRowClick = (data) => {
    setSelectedEnq(data);
      if(data.assignto && data.assignto._id==localStorage.getItem('councelor')){
        setd(false)
      } else{
        setd(true)
      }
    const offcanvas = new window.bootstrap.Offcanvas(
        document.getElementById("enqOffcanvas")
    );
    getfollowup(data._id);
    offcanvas.show();
};

//follow-up function for followup form...

const [status,setStatus] = useState('');
const [nextdate,setNextdate] = useState('');
const [remark,setRemark ] = useState('');
const [programme,setProgramme] = useState('');

async function addfollowup(e){
  e.preventDefault();
  const followupdata = {'enq':selectedEnq._id,'uid':localStorage.getItem('manager'),status,nextdate,remark,programme};
  console.log(followupdata);
  const res = await axios.post('http://localhost:3000/api/followup',followupdata);
  if(res.data.msg=="success"){
    window.alert("Follow Up Added Success");
    setStatus("");
    setRemark('');
    setProgramme('');
  } else {
    window.alert("something Went Wrong")
  }
}

//for getting history of followup 

const [filterfollowup,setFilterfollowup] = useState([])

const getfollowup = async(id)=>{
  const res = await axios.get('http://localhost:3000/api/followup');
  if(res.data.msg=="success"){
    const followupdata = res.data.followup;
    const fd = followupdata.filter((f)=>{
      return f.enq ==id;
    });
    setFilterfollowup(fd);
  }
}

// transfer button work in modal
 
const assignfun = (e) => {
        console.log(e);
        setEditId(e._id);
        var fu = user.filter((u) => {
            if (localStorage.getItem('manager') == u._id) {
                return false;
            }
            else {
                return u.center?.includes(e.center);
            }

        })
        setFilteruser(fu)
        // console.log(u)
        console.log("Enq center:", e.center);
        console.log("User centers:", user.map(u => u.center));
    }


  return (
    <>
      <h4>View All Enquires</h4>
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
           <tr   key={i} onClick={() =>e.status=='u'? handleRowClick(e):toast.error('Enquiry is Deactive')} style={{ cursor: "pointer" }} >

               {/* Sno. data In TBALE */ }
              <td>{i + 1}</td>

               {/*DATE data In TBALE */ }
              <td>{e.createdAt.split("T")[0]}</td>

                {/* ACTION work In TBALE three option whatapp; delete; assignto  START */ }
              <td>

                <a
                  href={`https://api.whatsapp.com/send?phone=${e.contact}`}
                  target="_blank"
                  className="btn btn-outline-success"
                  onClick={(e)=>e.stopPropagation()}
                >
                  WA
                </a>
                <button className="btn btn-primary" onClick={(e)=>e.stopPropagation()}>Copy</button>

                <div class="dropdown d-inline p-2">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    onClick={(e)=>e.stopPropagation()}
                  >
                    .....
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <button
                  onClick={(c) => {
                    delenq(e._id);
                    c.stopPropagation()
                    
                  }}
                >
                  {" "}
                  <i className="fa fa-trash text-danger" onClick={(e)=>e.stopPropagation()}></i>{" "}
                </button>
                    </li>
                    <li>
                      <>



  {/* Buttons */}

  <button
    type="button"
    className="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@getbootstrap"
    onClick={(c)=>{setEditid(e._id);
           c.stopPropagation() 
    }}


  >
    Assign
  </button>

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
              <td>{e.center }</td>
              <td>{e.ForProgramme}</td>

              <td>{e.assignto? e.assignto.name:"Not Assigned"}</td>
              <td>{e.status=="u"?"Active":"Deactive"}</td>
              <td>{e.Nextfollowup}</td>
             

              

              
            </tr>
          ))}
        </tbody>
      </table>

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
            user.map((u)=>(
                <option key={u._id} value={u._id}>{u.name} </option>
            ))
          }

          </select>
              
            </div>

            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
               Note /optional
              </label>
              <textarea value={rem} onChange={(e)=>setRem(e.target.value)}
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

  {/*Modal work start come from left side  */}


            <div 
  className="offcanvas offcanvas-end" 
  tabIndex="-1" 
  id="enqOffcanvas"
  style={{ width: "420px" }}
>
  <div className="offcanvas-header border-bottom">
    <div>
      <h5 className="mb-0">Enquiry Details</h5>
      <small className="text-muted">
        {selectedEnq?.course} • {selectedEnq?.center}
      </small>
    </div>

    <button 
      type="button" 
      className="btn-close" 
      data-bs-dismiss="offcanvas"
    ></button>
  </div>

  <div className="offcanvas-body">

    {selectedEnq && (
      <>
        {/* USER HEADER */}
        <div className="mb-3">
          <h6 className="mb-0">{selectedEnq.fullName}</h6>
          <small className="text-muted">
            {selectedEnq.course} • {selectedEnq.center}
          </small>

          <span className="badge bg-warning float-end">New</span>
        </div>

        <hr />

        {/* DETAILS */}
        <div className="mb-3">
          <p className="mb-1"><b>Mobile:</b> {selectedEnq.contactNumber}</p>
          <p className="mb-1"><b>Email:</b> {selectedEnq.email || "-"}</p>
          <p className="mb-1"><b>Course:</b> {selectedEnq.course}</p>
          <p className="mb-1"><b>Center:</b> {selectedEnq.center}</p>
          <p className="mb-1">
            <b>Assigned:</b> {selectedEnq.assignto?.name || "Not Assigned"}
          </p>
          <p className="mb-1">
            <b>Created:</b> {selectedEnq.createdAt?.split("T")[0]}
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex gap-2 mb-3">
          <a 
            href={`tel:${selectedEnq.contactNumber}`} 
            className="btn btn-outline-primary w-100"
          >
            Call
          </a>

          <a 
            href={`https://api.whatsapp.com/send/?phone=${selectedEnq.contactNumber}`} 
            target="_blank"
            className="btn btn-outline-success w-100"
          >
            WhatsApp
          </a>

          <button className="btn btn-outline-warning w-100" type="submit" data-bs-toggle='modal' data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={()=>{assignfun(selectedEnq)}}>
            Transfer
          </button>
        </div>

        <hr />

        {/* FOLLOW-UP SECTION */}
        <h6>Add Follow-Up</h6>

<div className="position-relative">
        {
          d && <div style={{background:"rgba(255,0,0,0.3)"}} className="d-flex justify-content-center align-items-center display-1 rounded-3 position-absolute w-100 h-100">
             <i className="fa-solid fa-lock"></i>
            
             </div>
        }


        <form onSubmit={addfollowup}>


        <div className="mb-2">
          <label>Status</label>
          <select className="form-control" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option>Follow Up</option>
            <option>Warm Enquiry</option>
            <option>Hot Enquiry</option>
            <option>Cold Enquiry</option>
            <option> Not-intersted</option>
            <option>Register</option>
          </select>
        </div>

        <div className="mb-2">
          <label>Next Follow-Up Date</label>
          <input type="date" className="form-control" value={nextdate} onChange={(e)=>setNextdate(e.target.value)} />
        </div>

        <div className="mb-2">
          <label>For Programme</label>
          <select className="form-control" value={programme} onChange={(e)=>setProgramme(e.target.value)}>
            <option>Select Programme</option>
             <option>Summer Training</option>
              <option> Vocational Training</option>
               <option>Industrial Training</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Remark</label>
          <textarea 
            className="form-control" 
            placeholder="Write exact conversation notes..."
            value={remark}
             onChange={(e)=>setRemark(e.target.value)}
          ></textarea>
        </div>

        <input type="submit" className="btn btn-warning w-100 mb-3" value="Save Follow Up" />


        </form>

        </div>
        <hr />

        {/* TIMELINE */}
        <div className="d-flex justify-content-between align-items-center">
          <h6>Follow-Up Timeline</h6>
          <button className="btn btn-sm btn-outline-secondary">
            Refresh
          </button>
        </div>

        {
          filterfollowup.map((f)=>(
            <div>

              {f.status}
            </div>
          ))
        }
      </>
    )}

  </div>
</div>



    {/*Modal work start come from left side  */}
    </>
    
  );
}

export default Couviewenq;
