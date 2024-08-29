import React, { useState } from 'react';
import './ServiceCard.css'; // Importing the CSS file

const ServiceCard = ({ service }) => {
  const [bookingStatus, setBookingStatus] = useState(service.bookingStatus);

  const handleStatusChange = (e) => {
    setBookingStatus(e.target.value);
    // You can call a function here to update the booking status on the server
  };
   if(!bookingStatus){
    return <div>You have not created any service yet</div>
   }
  return (
    <div className="Service-card">
      <h2>Order #{service.orderId}</h2>
      <div className="customer-details">
        <p><strong>Customer Name:</strong> {service.customerName}</p>
        <p><strong>Contact Number:</strong> {service.contactNumber}</p>
        <p><strong>Address:</strong> {service.buildingNumber}, {service.road}, {service.city} - {service.pincode}</p>
      </div>
      <div className="order-details">
        <p><strong>Payment Mode:</strong> {service.paymentMode}</p>
        <p><strong>Delivered:</strong> {service.delivered}</p>
        <label htmlFor="status">Booking Status:</label>
        <select id="status" value={service.bookingStatus} onChange={handleStatusChange}>
          <option value="Pending">Pending</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default ServiceCard;
