import React from 'react'
import { useState,useEffect } from 'react';
import LocationCard from './LocationCard';
import axios from 'axios';
export const AvaliableCities = () => {
    const [cities,setCities] = useState([]);
    const API = 'http://localhost:5000/api/v1/allcities';
    
    const getData=async()=>{
        try{
           const response=await axios.get(API)
           
           const data=response.data
           console.log(data)
           if(data.sucess){
             setCities(data.cities)
            console.log("33",data.cities)
           }
    
        }
        catch(error){
          console.log(error)
        }
      }
      
      //setCities("patna")
      //console.log(cities)
      console.log(cities)
      useEffect(()=>{
        getData()
      },[])
  return (
    <div className="flex justify-center items-center h-screen" style={{marginLeft:"180px"}}>
      <div className=" mx-auto grid grid-cols-1 gap-4">
        {cities.map(item => (
          <LocationCard key={item._id} item={item}/>
        ))}
      </div>
    </div>
  )
}
