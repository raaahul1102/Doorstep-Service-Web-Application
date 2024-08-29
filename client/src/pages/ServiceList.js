import React from 'react'
import LocationFilterComponent from '../components/LocationFilter'
import { ProviderListing } from '../components/ProviderListing'
import { data } from '../components/data'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './servicelist.css'
import PriceFilterComponent from '../components/PriceFilterComponent';
import RatingFilter from '../components/RatingFilter';
import SortingFilter from '../components/SortingFilter';
export const ServiceList = () => {
  const location = useLocation();

  const path = location.pathname;

  // Split the path to extract the service name
  const serviceName = decodeURIComponent(path.split("/").pop());
          console.log("15",serviceName)
  const services = useSelector(state => state.services);
  console.log("9",services.services)
  const locationfilter=useSelector((state)=>state.locationFilter.filters);
console.log("30",locationfilter)
const filteredServices = services.services.filter(service => {
  // Convert both service name and category to lowercase for case-insensitive comparison
  const serviceNameLower = serviceName.toLowerCase();
  const categoryLower = service.serviceName.toLowerCase();
  
  if (locationfilter.length === 0) {
    // If no location filters are applied, only check for category match
    return categoryLower === serviceNameLower;
  } else {
    // Check if both location and category match
    return locationfilter.includes(service.serviceLocation) && categoryLower === serviceNameLower;
  }
});

  return (
    <div className='container min-h-screen'>
        <div className='container-left'>
        <LocationFilterComponent/>
        {/* <PriceFilterComponent/>
        <RatingFilter/> */}
        </div>
        <div className='container-right'>
            {
                filteredServices.map((data)=>{
                     return  <ProviderListing data={data}/>
                })
            }
          
        </div>
       
    </div>
  )
}
