import React from 'react';
import './Application.css'; // Import CSS file for styling
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const Application = () => {
//console.log("5",application[0])
//   const { serviceTypes, serviceArea, ratings, certifications, photo, status, adharNumber, businessInformation } = application;
const user=useSelector(state=>state.user.userDetails);
const [application,setApplicaton]=useState(null)
async function getApplication(){
    try{
      const response=await axios.post('http://localhost:5000/api/v1/getapplication',{user:user})
      console.log(response)
      setApplicaton(response.data.application);
    }
    catch(error){
  console.log(error)
    }
}
useEffect(()=>{
    getApplication()
},[])
if (!application) {
    return <div>Loading...</div>;
  }
console.log(application)
  let statusColor;
  switch (application[0]?.status) {
    case 'Rejected':
      statusColor = 'red';
      break;
    case 'Pending':
      statusColor = 'orange';
      break;
    case 'Verified':
      statusColor = 'green';
      break;
    default:
      statusColor = 'black';
  }
  return (
    <div className="application-card" style={{ borderColor: statusColor }}>
      <div className="status" style={{ backgroundColor: statusColor }}>
        Status: {application[0].status}
      </div>
      <div className="application-info">
        <p><strong>Service Types:</strong> {application[0].serviceTypes}</p>
        <p><strong>Service Area:</strong> {application[0].serviceArea}</p>
        <p><strong>Ratings:</strong> {application[0].ratings}</p>
        {/* <p><strong>Certifications:</strong> {application[0].certifications}</p> */}
        <p><strong>Aadhar Number:</strong> {application[0].adharNumber}</p>
        <p><strong>Business Information:</strong> {application[0].businessInformation}</p>
      </div>
      <div className="images">
        <img src={application[0].photo} alt="Service Photo" />
      </div>
      <div className="images" style={{marginTop:"10px"}}>
        <img src={application[0].certifications} alt="Service Photo" />
      </div>
    </div>
  );
};


