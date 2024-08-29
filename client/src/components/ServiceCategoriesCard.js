import React from 'react';
import './ServiceCategoriesCard.css';
import { useNavigate } from 'react-router-dom';


const ServiceCategoriesCard = ({ item }) => {
  const navigate = useNavigate()
  function categoriesHandler() {
    const serviceCategories = item.name
    navigate(`/${serviceCategories}`)

  }
  //console.log(`http://localhost:5000/${item.categoriesImage}`)
  return (
    <div className="service-card">
     <img
  src={item.categoriesImage}
  alt="Service"
  className="service-image"
/>




      <div className="service-details">
        <h3 className="service-name">{item.name}</h3>
        {/* <p className="service-price"> starting from :${item.price}</p> */}
        <button className="view-button" onClick={categoriesHandler}>View</button>
      </div>
    </div>
  );
};

export default ServiceCategoriesCard;
