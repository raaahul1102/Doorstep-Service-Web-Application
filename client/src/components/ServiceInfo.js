import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { FiShoppingCart, FiBookOpen } from 'react-icons/fi';
import { add } from '../redux/slices/cartSlice';
import {useDispatch, useSelector } from 'react-redux';
const ServiceInfo = ({ service }) => {
  const dispatch=useDispatch()
function addtocartHandler(){
  dispatch(add(service[0]))
}
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg mt-8 my-12">
      <div className="flex items-center justify-center mb-4">
        <img src={service[0].serviceImage} alt="Service" className="w-80 h-60 object-cover rounded-lg" />
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ml-4 ${service[0].isAvalable? 'bg-green-500' : 'bg-red-500'}`}>
          <span className="text-white text-xl">{service[0].isAvalable ? '✔' : '✘'}</span>
        </div>
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{service[0].serviceName}</h2>
        <p className="text-gray-600">Prashant</p>
        <div className="flex items-center justify-center mt-2">
          {Array.from({ length: service[0].rating }).map((_, index) => (
            <AiFillStar key={index} className="text-yellow-500 text-lg" />
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">${service[0].price}</p>
        <div className="flex items-center text-gray-600">
          <FaMapMarkerAlt className="mr-1" />
          <p>{service[0].serviceLocation}</p>
        </div>
        <p>{service[0].serviceDescription
}</p>
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full mr-4 flex items-center" onClick={addtocartHandler}>
          <FiShoppingCart className="mr-1" />
          Add to Cart
        </button>
        {/* <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center">
          <FiBookOpen className="mr-1" />
          Book Now
        </button> */}
      </div>
    </div>
  );
};

export default ServiceInfo;
