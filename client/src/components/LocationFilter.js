import React, { useEffect, useState } from 'react';
import './LocationFilterComponent.css';
import { addLocationFilter,removeLocationFilter } from '../redux/slices/locationFilerSlice';
import { UseDispatch, useDispatch } from 'react-redux';
import axios from 'axios';
const LocationFilterComponent = () => {
    const [selectedLocations, setSelectedLocations] = useState([]);
     const dispatch=useDispatch()
     const handleLocationChange = (location) => {
        console.log("10",location.city)
        if (selectedLocations.includes(location)) {
            dispatch(removeLocationFilter(location.city));
            setSelectedLocations(prevSelectedLocations =>
                prevSelectedLocations.filter(selectedLocation => selectedLocation !== location)
            );
        }
        else{
            dispatch(addLocationFilter(location.city));
            setSelectedLocations(prevSelectedLocations => [...prevSelectedLocations, location]);
        }
    };
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
        <div className="location-filter-container border-none mt-6">
            <h2>Select Locations:</h2>
            <div className="location-checkboxes border-none">
                {cities.map((location, index) => (
                    <div key={index} className="location-checkbox">
                        <input
                            type="checkbox"
                            id={`location-${index}`}
                            checked={selectedLocations.includes(location)}
                            onChange={() => handleLocationChange(location)}
                        />
                        <label htmlFor={`location-${index}`}>{location.city}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default LocationFilterComponent;