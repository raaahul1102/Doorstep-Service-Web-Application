import React, { useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios'
const Services = () => {
    const user=useSelector(state=>state.user.userDetails)
    const [services,setService]=useState([])
          async function getservice(){
               try{
                  const response=await axios.post('http://localhost:5000/api/v1/getservicesbyproviderid',{providerId:user})
                  if(response.data.success){
                    setService(response.data.services);
                  }
               }
               catch(error){
                console.log(error)
               }
          }
          useEffect(()=>{
            getservice()
          },[])
  return (
    <div style={{marginTop:"30px"}}>
      {services.map((service, index) => (
        <ServiceCard  key={index} service={service} />
      ))}
    </div>
  );
};

export default Services;
