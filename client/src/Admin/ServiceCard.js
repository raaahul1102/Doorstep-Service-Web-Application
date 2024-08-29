import React from 'react';
import './AllServices.css'; // Import CSS file for styling
import { useSelector } from 'react-redux';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { removeService } from '../redux/slices/serviceSlice';
import { useDispatch } from 'react-redux';
const ServiceCard = ({service}) => {
   // const services =useSelector(state=>state.services.services)
   const dispatch = useDispatch();
    async function removeHandler() {
       
     // console.log("13",id)
      try {
          const response = await axios.post('http://localhost:5000/api/v1/removeservice', { id:service._id});
         
          if (response.data.success) {
              dispatch(removeService(service._id))
              toast.success('service removed successfully');
              window.location.reload();
          } else {
              toast.error('Error in service removal');
             
          }
      } catch (error) {
          console.log(error);
          toast.error('Failed to remove service');
      }
  }
    //console.log(services)
  return (
        <div key={service._id} className="service-cards">
          <img src={service.serviceImage} alt={service.serviceName} className="service-image" />
          <div className="service-info">
            <h3 className="service-name">{service.serviceName}</h3>
            <p className="service-description">{service.serviceDescription}</p>
            <p className="service-location"><strong>Location:</strong> {service.serviceLocation}</p>
            <p className="service-price"><strong>Price:</strong> ${service.price}</p>
            <p className="service-rating"><strong>Rating:</strong> {service.rating}</p>
            <div className="button-container">
              <button className="edit-button">Edit Service</button>
              <button className="remove-button" onClick={removeHandler}>Remove Service</button>
            </div>
            </div>
            </div>
  );
};

export default ServiceCard;
