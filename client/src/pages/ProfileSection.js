


import React, { useEffect, useState } from 'react';
import './ProfileSection.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ProfileSection = () => {
  const [isProvider,setIsProvider]=useState(false)
  let userId=localStorage.getItem('user')
  userId = userId.replace(/^"(.*)"$/, '$1');
const user=useSelector(state=>state.user.userDetails)
console.log(user);
async function getProfile(){
   try{
    const response=await axios.post('http://localhost:5000/api/v1/getprofile',{id:user})
    console.log(response.data.user.role)
   
       if(response.data.user.role=='Service Provider'){
        setIsProvider(true)
    }

   }
   catch(error){
    console.log(error)
   }
}
useEffect(()=>{
  getProfile()
},[])
console.log(isProvider)
  const navigate=useNavigate()
function derirect(){
  navigate('/application')
}
function gotoOrder(){
  navigate('/myorder')
}
function gotocart(){
  navigate('/cart')
}
function gotoDashBoard(){
  navigate('/providerdashboard')
}
  return (
    <div className="profile-card">
      <div className="profile-content">
        <button className="profile-button" onClick={gotoOrder}>My Order</button>
        <button className="profile-button">My Cart</button>
        {
          !isProvider?( <button className="profile-button" onClick={derirect}>Apply for Service Provider</button>):( <button className="profile-button" onClick={gotoDashBoard}>DashBoard</button>)
        }
       
        <button className="profile-button">Profile</button>
      </div>
    </div>
  );
}

export default ProfileSection;
