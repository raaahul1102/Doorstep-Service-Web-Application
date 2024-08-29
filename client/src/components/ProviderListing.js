import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdAdd } from "react-icons/io";
import './providerlist.css'
import { AiFillStar } from "react-icons/ai";
import {useDispatch, useSelector } from 'react-redux';
import { add } from '../redux/slices/cartSlice';

export const ProviderListing = ({data}) => {
 // console.log(locationfilter)
  const dispatch=useDispatch()
    const navigate=useNavigate()
    function viewHandler(){
      const id=data._id;
      navigate(`/service-details/${id}`)
    }
    function addToCartHandler(){
        dispatch(add(data))
    }
    const locationfilter=useSelector((state)=>state.locationFilter.filters);
console.log("30",locationfilter)
  return (
    <div className="service-card">
    <img src={data.serviceImage} alt="Service" className="service-image" />
    <div className="service-details">
      <h3 className="service-name">{data.serviceName}</h3>
      {/* <p className="service-description">{data.serviceDescription}</p> */}
      <p className="service-price">${data.price}</p>
      <div className="service-rating" style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "5px" }}>{data.rating}</span>
        {[...Array(Math.round(data.rating))].map((_, index) => (
          <AiFillStar key={index} style={{ color: "gold", width: "20px", height: "20px" }} />
        ))}
      </div>
      <div className='view-card'>
        <button className="view-button" onClick={viewHandler}>View</button>
        <button className="add-button" onClick={addToCartHandler}>
          <IoMdAdd style={{ width: "40px" }} />
        </button>
      </div>
    </div>
  </div>
  
  )
}
