import React from 'react';
import './AllServices.css'; // Import CSS file for styling
import { useSelector } from 'react-redux';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import ServiceCard from './ServiceCard';
const AllServices = () => {
    const services =useSelector(state=>state.services.services)
  return (
    <div className="all-services-container">
  {services.map(service => (
    <ServiceCard key={service._id} service={service} />
  ))}
</div>

  );
};

export default AllServices;
