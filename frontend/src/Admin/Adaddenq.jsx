import axios from 'axios';
import React, { useState, useEffect } from 'react';
 import './addenq.css';
function Addenq() {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [enq, setEnq] = useState([]);

  //  ADD CENTER
  async function addcenter(e) {
    e.preventDefault();

    try {
      const center = { name, address, status };

      const response = await axios.post('http://localhost:3000/api/center', center);

      if (response.data.msg === "success") {
        alert('Center added successfully');

        // refresh list
        getCenters();
      } else {
        alert('Something went wrong');
      }

      setName('');
      setAddress('');
      setStatus('');

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  // GET CENTERS
  const getCenters = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/center');

      if (response.data.msg === "success") {
        setEnq(response.data.center); // FIXED
      }
    } catch (error) {
      console.error(error);
    }
  };

  // LOAD DATA ON PAGE LOAD
  useEffect(() => {
    getCenters();
  }, []);

  return (
    <>

        <div className="enquiry-container">
      <div className="enquiry-card">
        <h2>Student Enquiry</h2>

        <form className="enquiry-form">
          <div className="form-grid">
            
            <select>
              <option>-- Select Center --</option>
            </select>

            <select>
              <option>Walk-in</option>
            </select>

            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="College" />

            <input type="text" placeholder="Course" />
            <input type="text" placeholder="Branch" />

            <input type="text" placeholder="Year" />
            <input type="text" placeholder="Contact Number *" />

            <input type="email" placeholder="Email" />

            <select>
              <option>Select Program</option>
            </select>

          </div>

          <button type="submit" className="submit-btn ">
            Save Enquiry
          </button>
        </form>

        <p className="footer-text">
          Design and Developed by <span>❤️</span>
        </p>
      </div>
    </div>

      
    </>
  );
}

export default Addenq;