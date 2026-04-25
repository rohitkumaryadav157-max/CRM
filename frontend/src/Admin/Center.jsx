import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function Center() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [enq, setEnq] = useState([]);
  const [editId, setEditId] = useState(null);

  // ADD / UPDATE CENTER
  async function addcenter(e) {
    e.preventDefault();

    try {
      const center = { name, address, status };

      if (editId) {
        // UPDATE
        const res = await axios.put(`http://localhost:3000/api/center/${editId}`, center);
        if (res.data.msg === "updated") {
          alert("Center updated");
          setEditId(null);
        }
      } else {
        // ADD
        const res = await axios.post('http://localhost:3000/api/center', center);
        if (res.data.msg === "success") {
          alert('Center added');
        }
      }

      getCenters();

      // reset form
      setName('');
      setAddress('');
      setStatus('');

    } catch (error) {
      console.error(error);
      alert("Error");
    }
  }

  //  GET CENTERS
  const getCenters = async () => {
    const res = await axios.get('http://localhost:3000/api/center');
    if (res.data.msg === "success") {
      setEnq(res.data.center);
    }
  };

  //  DELETE CENTER
  const deleteCenter = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await axios.delete(`http://localhost:3000/api/center/${id}`);
      if (res.data.msg === "deleted") {
        alert("Deleted successfully");
        getCenters();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //  EDIT CENTER (FILL FORM)
  const editCenter = (data) => {
    setName(data.name);
    setAddress(data.address);
    setStatus(data.status);
    setEditId(data._id);
  };

  useEffect(() => {
    getCenters();
  }, []);


  //chnage status function
  async function changeStatus(id,st) {
    const res = await axios.put(`http://localhost:3000/api/center/${id}/${st}`)
    if(res.data.msg=="success"){
      toast.success("Status Updated")
      getCenters();
    } else{
      toast.error("Something Went Wrong")
    }
  }

  return (
    <>
      {/* FORM */}
      <form className='w-50 mx-auto p-5 shadow-lg rounded-5' onSubmit={addcenter}>
        
        <h4>{editId ? "Update Center" : "Add Center"}</h4>

        <input 
          type='text' 
          className='form-control'
          placeholder='Enter Center Name'
          value={name}
          onChange={(e) => setName(e.target.value)} 
        /> 
        <br/>

        <textarea 
          className='form-control'
          placeholder='Enter Address'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea> 
        <br/>

        <select 
          className='form-control'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">--Select Status--</option>
          <option value='Active'>Active</option>
          <option value='Deactive'>Deactive</option>
        </select>
        
        <br/>

        <input 
          type="submit"
          value={editId ? "Update Center" : "Add Center"}
          className='btn btn-primary form-control'
        />
      </form>

      {/* TABLE */}
      <div className="container mt-5">
        <h4>View All Centers</h4>

        <table className='table table-dark border table-responsive'>
          <thead>
            <tr>
              <th>S no.</th>
              <th>Name</th>
              <th>Address</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              enq.map((e, i) => (
                <tr key={e._id}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.address}</td>

                  <td>
                    <span style={{ color: e.status === "Active" ? "green" : "red" }}>
                      {e.status}
                    </span>

                    <button 
                      className={`btn ${e.status=="Active"?"btn-danger":"btn-success"} btn-sm m-3`}
                      onClick={()=>{changeStatus(e._id,e.status)}}
                    >
                      {e.status=="Active"?"Deactive":"Active"}
                    </button>
                  </td>

                  <td>
                    <button 
                      className='btn btn-warning btn-sm'
                      onClick={() => editCenter(e)}
                    >
                      Edit
                    </button>
                  </td>

                  <td>
                    <button 
                      className='btn btn-danger btn-sm'
                      onClick={() => deleteCenter(e._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Center;