import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const PendingCard = ({ application }) => {
    const navigate=useNavigate()
    const [status,setStatus]=useState('Pending')
    const id=application.user._id;
    const appId=application._id;
    console.log("8",id,appId)
   const URL='http://localhost:5000/api/v1/updatestatus'
   const updateStatus=async(e)=>{
    e.preventDefault()
    try{
        const response=await axios.post(URL,{
            status,
            id,
            appId
        })
        console.log("20",response)
        const data=response.data

        if(data.success){
            toast.success('Application status Updated Sucessfully')
            // navigate('/admindashboard')
            window.location.reload();
        }
        else{
            toast.error('Something Went wrong')
        }

    }
    catch(error){
        console.log(error)
    }
   }
   
   
// useEffect(()=>{
//     updateStatus()
// },[status])

  return (

    <form onSubmit={updateStatus}>
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">{application.user.fullName}</h2>
        <p className="mb-2">Location: {application.serviceArea}</p>
        <p className="mb-2">Contact-Number: {application.user.phoneNumber}</p>
        <p className="mb-2">Email-id: {application.user.email}</p>
        <p className="mb-2">Service Name: {application.serviceTypes}</p>
        <p className="mb-2">Application status: {application.status}</p>
        <img src={application.photo} alt="Application Photo" className="mb-2 rounded-lg" />
        <Link to={`http://localhost:5000/${application.certifications}`} target="_blank" rel="noopener noreferrer" className='cursor-pointer'>View Certifications</Link>
        <div className="flex justify-between">
          <select className="bg-blue-500 text-white px-4 py-2 rounded-md" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Verified">Accept</option>
            <option value="Rejected">Reject</option>
          </select>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Update Status</button>
        </div>
      </div>
    </form>
  );
};

export default PendingCard;
