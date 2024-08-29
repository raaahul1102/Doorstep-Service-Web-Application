import React from 'react'
import { useLocation } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux'
import ServiceInfo from '../components/ServiceInfo'
 const ServiceDetails = () => {
    const services=useSelector((state)=>state.services)
    const allServices=services.services
    
    console.log("7",allServices)
    const location=useLocation()
    const path=location.pathname
    const ids=path.split('/')
    const serviceId=ids[ids.length-1]
    const requiredServices=allServices.filter((item)=>{
      return  item._id==serviceId
    })
    console.log("6",requiredServices)
  return (
    <ServiceInfo 
  service={requiredServices}
/>

  )
}
export default ServiceDetails;