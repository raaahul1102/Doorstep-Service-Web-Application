import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './OrderList.css'; // Importing the CSS file

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/orders', { id: user.userDetails });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="order-list-container">
      {orders.map(order => (
        <div key={order._id} className="order-item">
          <div className="order-details">
            <h2 className="order-title">Order #{order._id}</h2>
            <div className="order-customer-info">
              <p><strong>Customer:</strong> {order.address.name}</p>
              <p><strong>Contact Number:</strong> {order.address.contactNumber}</p>
            </div>
            <div className="order-summary">
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Address:</strong>
                {order.address.buildingNumber}, {order.address.road}, {order.address.city} - {order.address.pincode}</p>
              <p><strong>Delivery Mode:</strong> {order.paymentMode === 'COD' ? 'Cash on Delivery ($' + order.totalAmount + ')' : 'Online Payment'}</p>
            </div>
          </div>
          <div className="order-services">
            {order.services.map(serviceObj => (
              <div key={serviceObj._id} className="services-card">
                <h3 className="service-title">Service: {serviceObj.service.serviceName}</h3>
                <div className="service-details">
                  <p><strong>Price:</strong> ${serviceObj.service.price}</p>
                  <p><strong>Description:</strong> {serviceObj.service.serviceDescription}</p>
                  <p style={{fontSize:"20px"}}><strong>Booking Status:</strong > {serviceObj.BookingStatus}</p>
                </div>
                <p className="service-delivered"><strong>Delivered:</strong> {serviceObj.delivered}</p>
                <div className='track'>
                    <button className='location'>Live Location</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
