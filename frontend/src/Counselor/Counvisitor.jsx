import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Counvisitor() {

  const [visitor, setvisitor] = useState([]);

  const getvisitor = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/visitor');

      if (response.data.msg === "success") {
        setvisitor(response.data.visitor);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getvisitor();
  }, []);

  return (
    <>
      <h4>View All Visitors</h4>

      <table className='table table-dark'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Remark</th>
            <th>Role</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>

        <tbody>
          {visitor.map((e, i) => (
            <tr key={i}>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.contact}</td>
              <td>{e.address}</td>
              <td>{e.remark}</td>
              <td>{e.role}</td>
              <td><i className='fa fa-edit'></i></td>
              <td ><i className='fa fa-trash text-danger'></i></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Counvisitor;