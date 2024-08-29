import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'
const AddCity = () => {
  const [city, setCityName] = useState('');

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };
  const API_URL='http://localhost:5000/api/v1/addcity'
  const handleAddCity = async() => {
    console.log('Adding city:', city);
     try{
      const response= await axios.post(API_URL,{
        city:city
      })
      const data=response.data;
      if(data.success){
         toast.success('City Added')
      }

  
     }
   catch(error){
    console.log(error)
   }

   
    setCityName('');
  };

  return (
    <div className="flex items-center justify-center mt-8 ml-4">
  <input
    type="text"
    placeholder="Enter city name"
    value={city}
    onChange={handleInputChange}
    className="border border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
    style={{ marginTop: '4px' }} // Add margin-top inline style
  />
  <button
    onClick={handleAddCity}
    className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-15 w-30"
  >
    Add City
  </button>
</div>

  );
};

export default AddCity;
