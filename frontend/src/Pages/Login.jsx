import React, { useEffect, useState } from 'react';
import './login.css';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import logo from "../assets/spilogo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

function Login()  {
     
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
  const navigate = useNavigate();

// Login Work of admin,Manager ,Councelor
 const loginuser = async(e)=>{
    e.preventDefault();

    console.log(email,password);

    const user ={email,password};

    const response = await axios.post('http://localhost:3000/api/admin/log',user);
    if(response.data.msg=="success"){
        toast.success('Login Success🎉🎉')
        // window.alert("Login Success🎉🎉");
        localStorage.setItem(response.data.role,response.data.id);
        setEmail("");
        setPassword("");
        if(response.data.role=="admin"){
             navigate('/admin');
        } else if(response.data.role=="manager"){
            navigate('/manager');
        } else{
            navigate('/counselor');
        }
        
    } else {
        toast.error(response.data.msg);
        setPassword("");
    }

 }

 //code for show password by click in font-awesome
 function showpass(){
    const t=document.querySelector('input[name=password]');
    if(t.type=="password"){
        t.type="text";
        eye.className="fa-solid fa-eye eye";
    } else{
        eye.className="fa-solid fa-eye-slash eye";
        t.type="password"
    }
 }
    

    return (
        <div className="login-wrapper">
            <div className="login-card">
                {/* Logo Section */}
                <div className="logo-container">
                    <img src={logo} alt="SPI Logo" style={{width: "55px"}}/>
                </div>
                <div className="crm-text">CRM</div>

                {/* Welcome Section */}
                <h4 className="welcome-text">Welcome Back 👋</h4>
                <p className="signin-subtext">Sign in to continue</p>

                {/* Form Section */}
                <form className="login-form" onSubmit={loginuser}>
                    <div className="mb-3">
                        <label>Username *</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Enter username"
                            required 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password *</label>
                        <div className="input-group">
                            <input 
                                type="password" 
                                className="form-control border-end-0" 
                                placeholder="Enter password" 
                                required
                                value={password}
                                name='password'
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <span >

                        <i id='eye' className="fa-solid fa-eye-slash eye" style={{ color: "rgb(255, 186, 0)" }} onClick={showpass}></i>


                            </span>
                           
                        </div>
                    </div>

                    <button type="submit" className="btn-signin" >
                        <FaSignInAlt /> Sign In
                    </button>
                </form>

                {/* Internal Footer */}
                <div className="login-footer">
                    Designed & Developed By <span className="footer-highlight">Softpro India <br /> Computer Technologies (P). Ltd.</span>
                </div>
            </div>
        </div>
    );
};

export default Login;