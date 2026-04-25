import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function User() {






  


    const [centers,setCenters] = useState([]);
    const [center,setCenter] = useState([]);
    const [name,setName] = useState("");
    const [number,setNumber] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState('');
    const [user,setUser] = useState([]);

  //for TABLE PRINT BY TAKING DATA FROM FORM 
const getuser = async(e)=>{
  
  const user = {name,number,email,role,center}
  const response = await axios.get('http://localhost:3000/api/user',user);
  if(response.data.msg=="success"){
   setUser(response.data.user);
  } else {
    window.alert('error');
  }

}

useEffect(()=>{
  getuser()
},[])


//for posting data to view on table 
    const addusercode= async(e)=>{
    e.preventDefault();
    const user = {name,number,email,role,center}
    const response = await axios.post('http://localhost:3000/api/user',user);
    if(response.data.msg=="success"){
        window.alert('User ADDED SUCCESS');

     getuser();
        
        setName('');
        setNumber('');
        setEmail('');

    } else{
        window.alert('something went wrong ');
        setRole('');
        setCenter('');
        
    }
    }

// for getting data from user by filling form
    const getCenter = async ()=>{
        const res = await axios.get('http://localhost:3000/api/center');
        if(res.data.msg=="success"){
            var x = res.data.center;
            //console.log(x); (for check)
            x = x.filter((e)=>e.status=="u");
            //console.log(x); (for check)
            setCenters(x);
        }
    }
    useEffect(()=>{
        getCenter();
    },[])



   // code for delte the user
      const deluser = async(id)=>{
        const res = await axios.delete(`http://localhost:3000/api/user/${id}` );
        if(res.data.msg=="success"){
            window.alert("data delete succesfull")
            getuser();
        }
      }



      //code for update the user 

     
    const[editId,setEditid]=useState(null);
    const updateUser = async(e)=>{
        e.preventDefault()
        const visiter = {name,email,number,role,center}
        const res = await axios.put(`http://localhost:3000/api/user/${editId}`,visiter)
        if(res.data.msg=="success"){
            window.alert("User Update Success✅")
            setEditid(null);
            setName("");
            setEmail("");
            setNumber("");
            setRole("");
            setCenter("")
            getuser()
        }
        else{
            window.alert("something went wrong")
        }
    }



    async function changeStatus(id,st) {
      const res = await axios.put(`http://localhost:3000/api/user/${id}/${st}`);
      if(res.data.msg="success"){
          toast.success('status Updated');
           getuser();
      } else{
        toast.error('Something Went Wrong');
      }
    }


  return (
    <>
       <form action="" className='w-50 mx-auto p-5 shadow-lg rounded-5' onSubmit={editId ? updateUser : addusercode}>
        Enter Your Name:
        <input type="text" className='form-control' value={name} onChange={(e)=>setName(e.target.value)}/> <br/> 

        Enter Email:
        <input type="email" name='' id='' value={email} className='form-control' onChange={(e)=>setEmail(e.target.value)}/> <br/> 

        Enter Mobile:
        <input type="number" value={number} className='form-control' onChange={(e)=>setNumber(e.target.value)}/> 


                 <br/> 




        Role:
        <select name="" id="" value={role} className='form-control' onChange={(e=>setRole(e.target.value))}>

            <option value="">--Select Role--</option>
            <option value="manager">Manager</option>
            <option value="counseler">Counseler</option>

        </select>


        <br/> 

        Center:
        <select   className='form-control' value={center} onChange={(e)=>setCenter(e.target.value)}>
         <option >--Select Center --</option>

         {
            centers.map((c)=>(
          <option key={c._id} value={c.name} >{c.name}</option>
            ))
         }

        </select>

        <br/> <br/>

        <input 
  type="submit" 
  value={editId ? "Update User" : "Add User"} 
  className={`form-control ${editId ? "bg-warning" : "bg-success"}`}
/>

       </form>




        {/* TABLE */}
       <div className="container mt-5">
        <h4>View All Users</h4>

        <table className='table table-dark border'>
          <thead>
            <tr>
              <th>S no.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Center</th>
              <th>Status</th>
              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              user.map((e, i) => (
                <tr key={e._id}>

                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.number}</td>
                  <td>{e.role}</td>
                  <td>{e.center}</td>
                  <td><small className={`${e.status=="u"? "text-success":"text-danger" } m-3` }>   {e.status=="u" ? "Active":"Deactive"}  </small>         
                   <button className={`btn ${e.status=="u"?"btn-danger":"btn-success"} text-white`} onClick={()=> changeStatus(e._id,(e.status))} > {e.status=="u"?"Deactive":"Active"} </button>      </td>


                 <td><button   onClick={()=>{
                            setName(e.name);
                            setEmail(e.email);
                            setNumber(e.number);
                            setRole(e.role);
                            setCenter(e.center);
                            setEditid(e._id)
                        }}>   <i className='fa fa-edit text-primary'></i>     </button></td>


              <td> <button  onClick={()=>{
                            deluser(e._id);
                        }}> <i className='fa fa-trash text-danger'></i>  </button></td>
                  
                </tr>
              ))
            }
          </tbody>
        </table>
        </div> 
        </>
  )
}

export default User