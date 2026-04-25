import React, { useEffect } from "react";
import "./home.css";
import logo from "../assets/spilogo.png";
import axios from "axios";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaGraduationCap,
  FaUniversity,
  FaBook,
  FaLaptopCode,
  FaPaperPlane,
} from "react-icons/fa";

import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Home() {
  const [role, setRole] = useState("student");
  const [status, setStatus] = useState("u");
  const [center, setCenter] = useState("");
  const [fullName, setFullName] = useState("");
  const [branch, setBranch] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [purpose, setPurpose] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");
  const [remark, setRemark] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");


  //for sending data of enquiry or visitor to database
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (role === "student") {
        const data = {
          fullName,
          college,
          branch,
          course,
          year,
          contactNumber,
          email,
          purpose,
          role,
          center,
          status,
        };
        console.log(data);
        const res = await axios.post("http://localhost:3000/api/enq", data);
        if (res.data.msg == "success") {
         Swal.fire({
  title: "Submit Success!",
  icon: "success",
  draggable: true
});
        }
      } else if (role == "visitorofficial") {
        const data = {
          name,
          center,
          remark,
          contact,
          email,
          purpose,
          role,
        };
        console.log(data);

        const res = await axios.post("http://localhost:3000/api/visitor", data);
        console.log(res);
        if (res.data.msg == "success") {
          alert("visitor (Official) success registration");
        }
      } else {
        const data = {
          name,
          center,
          contact,
          email,
          role,
          address,
        };
        console.log(data);

        const res = await axios.post("http://localhost:3000/api/visitor", data);
        console.log(res);
        if (res.data.msg == "success") {
          alert("visitor (Personal) success registration");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Error ❌");
    }
  };


  //END work of data sending 


// for getting center dynamic 
  const [centers, setCenters] = useState([]);//making variable for center to set value

  
  const getCenter = async () => {
    const res = await axios.get("http://localhost:3000/api/center");
    console.log(res);
    if (res.data.msg == "success") {
      var x = res.data.center;
      //console.log(x); (for check)
      x = x.filter((e) => e.status == "u");
      //console.log(x); (for check)
      setCenters(x);
    }
  };
  useEffect(() => {
    getCenter();
  }, []);


  //work get over of dynamic center



//code for putting condition logic for form chnage student, visito(official), visitor(personal)
  let formsection;

  if (role == "student") {
    formsection = (
      <>
        <div className="col-md-12">
          <div className="student-info-tag">
            <FaGraduationCap className="me-2" /> Student Information
          </div>
        </div>

        {/* Form Fields */}
        <div className="col-md-6">
          <label className="small fw-bold mb-1">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser size={14} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Aman Verma"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">College</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUniversity size={14} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Your college name"
              value={college}
              onChange={(e) => {
                setCollege(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Course</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaBook size={14} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., B.Tech / BCA"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Branch</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-code-fork"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., CSE/ IT / ECE"
              value={branch}
              onChange={(e) => {
                setBranch(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Year</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-regular fa-calendar-days"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., 2nd Year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Contact Number</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-phone-volume"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="10-digit- mobile"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-envelope"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Purpose</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-code-fork"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>

            <select
              className="form-select"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option>-- Select Purpose --</option>
              <option>Enquiry</option>
              <option>Registration</option>
              <option>Reporting</option>
              <option>Certificate Work</option>
            </select>
          </div>
        </div>
      </>
    );
  } else if (role == "visitorofficial") { //conditon for visitorofficial 
    formsection = (
      <>
        <div className="col-md-12">
          <div className="student-info-tag">
            <FaGraduationCap className="me-2" /> Visitor Information
          </div>
        </div>

        {/* Form Fields */}
        <div className="col-md-6">
          <label className="small fw-bold mb-1">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser size={14} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Aman Verma"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Contact Number</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-phone-volume"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="10-digit- mobile"
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-envelope"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Purpose</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-code-fork"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>

            <select
              className="form-select"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            >
              <option>-- Select Purpose --</option>
              <option>Enquiry</option>
              <option>Registration</option>
              <option>Reporting</option>
              <option>Certificate Work</option>
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Remark</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-envelope"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={remark}
              onChange={(e) => {
                setRemark(e.target.value);
              }}
            />
          </div>
        </div>
      </>
    ); // CONDITON FOR  visitorPARSONAL
  } else {
    formsection = (
      <>
        <div className="col-md-12">
          <div className="student-info-tag">
            <FaGraduationCap className="me-2" /> Visitor Information
          </div>
        </div>

        {/* Form Fields */}
        <div className="col-md-6">
          <label className="small fw-bold mb-1">Full Name</label>
          <div className="input-group">
            <span className="input-group-text">
              <FaUser size={14} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., Aman Verma"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Contact Number</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-phone-volume"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="10-digit- mobile"
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-envelope"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <label className="small fw-bold mb-1">Address</label>
          <div className="input-group">
            <span className="input-group-text">
              <i
                className="fa-solid fa-code-fork"
                style={{ color: "rgb(205, 205, 205)" }}
              ></i>
            </span>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
        </div>
      </>
    );//WORK GET OVER OF FORM CONDITION
  }

  return (
    <div className="page-wrapper">
      {/* Header Section */}
      <header className="main-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {/* <div className="bg-white rounded-circle p-2 me-3 shadow-sm"> */}
          <img
            src={logo}
            alt="Softpro Logo"
            style={{
              width: "55px",
              marginRight: "40px",
              border: "2px dotted white",
              borderRadius: "50%",
              padding: "4px",
            }}
          />

          <h5 className="mb-0 fw-bold">
            Softpro India Computer Technologies (P) Ltd.
          </h5>
        </div>

        <div className="header-info-box d-none d-lg-block">
          A Company Founded by Technocrats from IIT & IET
        </div>

        <Link to="/login">
          <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
            Login
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <div className="container">
        <div className="content-card">
          <div className="row">
            {/* Left Column: Contact Details */}
            <div className="col-md-4 pe-md-4">
              <h4 className="fw-bold mb-4">Contact Us</h4>
              <div className="mb-4">
                <p className="small mb-1">
                  <FaPhoneAlt className="text-warning me-2" /> Call: +91
                  7080102006, 7080462022
                </p>
                <p className="small">
                  <FaEnvelope className="text-warning me-2" /> Email:
                  hr@softproindia.in
                </p>
              </div>

              {/* Office Addresses */}
              <div className="office-card">
                <h6>
                  <FaMapMarkerAlt className="text-warning me-2" /> Softpro Head
                  Office
                </h6>
                <p>
                  Softpro Tower, Near New Hanuman Temple, Kapoorthala, Aliganj,
                  Lucknow - 226006.
                </p>
                <p className="mb-0">
                  <strong>Mobile Number:</strong> +91 7080102007
                </p>
              </div>

              <div className="office-card">
                <h6>
                  <FaMapMarkerAlt className="text-warning me-2" /> Softpro House
                  Lucknow
                </h6>
                <p>
                  3/213, Sector J, Jankipuram, Kursi Rd Near Gudamba Thana,
                  Lucknow - 226026.
                </p>
                <p className="mb-0">
                  <strong>Mobile Number:</strong> +91 7080462022
                </p>
              </div>

              <div className="office-card">
                <h6>
                  <FaMapMarkerAlt className="text-warning me-2" /> Softpro
                  FullStack Academy
                </h6>
                <p>1/6, Vastu Khand, Gomtinagar,Lucknow -226010.</p>
                <p className="mb-0">
                  <strong>Mobile Number:</strong> +91 7080462022
                </p>
              </div>

              <div className="office-card">
                <h6>
                  <FaMapMarkerAlt className="text-warning me-2" /> Softpro Noida
                  Office
                </h6>
                <p>
                  Creatons Business Park,Ground Floor, H - 35, Sec 63,Noida
                  Gautam Buddha Nagar, UP - 201301.
                </p>
                <p className="mb-0">
                  <strong>Mobile Number:</strong> +91 7080462022
                </p>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div className="col-md-8 ps-md-5 border-start ">
              <div className="d-flex align-items-center mb-4 ">
                <div className="bg-light p-2 rounded me-3 ">
                  <FaEnvelope size={20} className="text-warning" />
                </div>
                <h3 className="enquiry-title mb-0">Enquiry Form</h3>
              </div>

              {/*Form part start */}

              <form className="row g-3 " onSubmit={handleSubmit} method="post">
                <div className="col-md-12">
                  <label className="small fw-bold mb-1">You are a ?</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser size={14} />
                    </span>
                    <select
                      className="form-select"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option value="student"> Student</option>
                      <option value="visitorofficial">Visitor(Official)</option>
                      <option value="visitorpersonal">Visitor(Personal)</option>
                    </select>
                  </div>

                  <label className="small fw-bold mb-1">You are at ?</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i
                        className="fa-solid fa-earth-americas"
                        style={{ color: "rgb(205, 205, 205)" }}
                      ></i>
                    </span>
                    <select
                      className="form-select"
                      value={center}
                      onChange={(e) => {
                        setCenter(e.target.value);
                      }}
                    >
                      <option>-- Select Center --</option>
                      {centers.map((c) => (
                        <option key={c._id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                      {/* <option>Softpro Noida Office</option>
                        <option>Softpro House, Jankipuram, Lucknow</option>
                         <option>Softpro Tower, Kapoorthala, Lucknow</option>
                          <option>Softpro Full Stack Academy, Gomtinagar, Lucknow</option> */}
                    </select>
                  </div>
                </div>

                {formsection}

                <div className="col-md-12 text-end mt-4">
                  <button type="submit" className="submit-btn float-end">
                    <FaPaperPlane /> Submit Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center mt-5 text-secondary small footer">
        2025 © Copyright Softpro India Computer Technologies (P) Ltd. All rights
        Reserved.
      </footer>
    </div>
  );
}

export default Home;
