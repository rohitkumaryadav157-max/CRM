import React, { useEffect, useState } from 'react'
import a2 from "../assets/a2.webp"
import bg1 from '../assets/bg1.jpeg'
import axios from 'axios'
import { toast } from 'react-toastify'
// import "../assets/bg1.jpg"
function CounProfile() {
    const [name,setName] =useState('')
    const [userdata,setUserdata] =useState('')
    const [address, setAddress] = useState('');
    const [skill, setSkill] = useState('');
    const [qua, setQua] = useState('');
    const [exp, setExp] = useState('');
    const [check,setCheck] =useState(false)

const getuser= async()=>{
    const res = await axios.get(`http://localhost:3000/api/user/${localStorage.getItem('counseler')}`)
     if(res.data.msg=="success"){
        console.log('username',res.data.user)
        setUserdata(res.data.user)
        const name =res.data.user.name
        setName(name)
     }
  }

  async function updateProfile() {
      if(check){
        const datauser ={ qua, exp, skill,address};
        const res = await axios.put(`http://localhost:3000/api/user/${localStorage.getItem('counseler')}`,datauser);
        if(res.data.msg=="success"){
            toast.success("Update Success");
        } else {
            toast.error("Something Went Wrong ")
        }
      }
  }

  async function uploadPic(p) {
    if(p){
        const res = await axios.post(`http://localhost:3000/api/user/upload`,{"profilePic":p})
        console.log(res)
        if(res.data.msg =="success"){
            toast.success("pic Uploaded ")
        } else {
            toast.error("something went wrong")
        }
    } else {
        toast.error("No image selected")
    }
    
  }
    
  useEffect(()=>{
getuser()
  },[])
  return (
    <>
    

   <div className="container-fluid">
     <div className="row changeprofile-bg "style={{backgroundImage:`url(${bg1})` , height:"85vh", backgroundSize:"cover",overflow:"auto"}} >
          <div className="col-md-6 h-100  p-3 ">
              <div className="card  shadow-lg p-4">
                  <img src={a2} alt="" className='  ' style={{height:"200px",width:"200px",borderRadius:"50%",margin:"0px auto"}} />
                  <label htmlFor='profilepic' className='bg-danger'>
                  <i className="fa-solid fa-user-pen position-absolute py-2 bg-info text-primary rounded-circle " style={{color:" rgb(234, 242, 10);", right:"28%", bottom:"14%",width:"30px"   }}></i>
                  </label>
                 <p className='my-2'>Name: <strong>{name}</strong> </p>
                 <p className=''>Email: <strong>{userdata.email}</strong> </p>
                 <p className=''>Mobile: <strong>{userdata.number}</strong> </p>
                 <p className=''>Center: <strong>{userdata.center}</strong> </p>
                 <p className=''>Mobile: <strong>{userdata.role}</strong> </p>
                <p className=''>Qualification: <strong> {check?<input className='w-100' type='text' value={qua} onChange={(e)=>setQua(e.target.value)}/>:qua || "----"} </strong> </p>
                <p className=''>Skill: <strong>{check?<input className='w-100' type='text' value={skill} onChange={(e)=>setSkill(e.target.value)}/> :skill || "----"} </strong> </p>
                <p className=''>Experience: <strong> {check?<input className='w-100' type='text' value={exp} onChange={(e)=>setExp(e.target.value)}/>:exp || "---"}</strong> </p>
                <p className=''>Address: <strong>{ check?<input className='w-100' type='text' value={address} onChange={(e)=>setAddress(e.target.value)}/>:address || "---"}</strong> </p>
                <button className='btn btn-warning' onClick={()=>{setCheck(!check);updateProfile}} >Update</button>

                 

              </div>
          </div>
          <div className="col-md-6 p-3">
              <div className="card  shadow-lg my-3" style={{height:"45%"}}>

              </div>
              <div className="card shadow-lg my-3" style={{height:"45%"}}>

              </div>
          </div>
    </div>
   </div>



    </>
  )
}

export default CounProfile