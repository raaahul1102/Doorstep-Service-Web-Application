import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { remove } from '../redux/slices/cartSlice';
export const Checkout = ({ totalAmount }) => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [road, setRoad] = useState('');
  const cart = useSelector(state => state.cart.cart);
  const user = useSelector(state => state.user);
  console.log("91", totalAmount)
  console.log("cart",cart)
  function getCartItemsWithId(cart) {
    return cart.map(item => ({ service: item._id }));
  }

  function getServiceProviderWithId(cart) {
    return cart.map(item => ({ provider: item.serviceProvider }));
  }

  console.log("14", getServiceProviderWithId(cart)[0].provider)
  const services = [];
  const providers = [];
  for (let i = 0; i < cart.length; i++) {
    services.push({
      service: getCartItemsWithId(cart)[i].service
    })
  }
  for (let i = 0; i < cart.length; i++) {
    providers.push({
      provider: getServiceProviderWithId(cart)[i].provider
    })
  }
  console.log("cart",cart)
  console.log("42",providers)
  console.log(services)
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleBuildingNumberChange = (e) => {
    setBuildingNumber(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleRoadChange = (e) => {
    setRoad(e.target.value);
  };

  const handleOnlinePayment = () => {
    // Implement online payment logic here
    alert('Online payment initiated!');
  };

  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/addorder', {
        services: services,
        customerId: user.userDetails,
        providers: providers,
        totalAmount: totalAmount,
        address: {
        name: name,
        contactNumber: contactNumber,
          buildingNumber: buildingNumber,
          city: city,
          road: road,
          pincode: pincode,
        },
      })
      const data=response.data;
      if(data.success){
        for(let i=0;i<cart.length;i++){
          dispatch(remove(cart[i]))
        }
        toast.success('service Booked Sucessfully')
        navigate('/mybooking')
      }
    }
    catch (error) {
       console.log(error)
    }
  };

  return (
    <div className="mt-0 max-w-md mx-20 p-4 bg-gray-100 rounded-lg shadow-md mb-20">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-gray-700 font-bold mb-2">
            Contact Number
          </label>
          <input
            type="text"
            id="contactNumber"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={contactNumber}
            onChange={handleContactNumberChange}
            placeholder="Enter contact number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="buildingNumber" className="block text-gray-700 font-bold mb-2">
            Building Number
          </label>
          <input
            type="text"
            id="buildingNumber"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={buildingNumber}
            onChange={handleBuildingNumberChange}
            placeholder="Enter building number"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={city}
            onChange={handleCityChange}
            placeholder="Enter city"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pincode" className="block text-gray-700 font-bold mb-2">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="Enter pincode"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="road" className="block text-gray-700 font-bold mb-2">
            Road
          </label>
          <input
            type="text"
            id="road"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            value={road}
            onChange={handleRoadChange}
            placeholder="Enter road"
          />
        </div>
      </form>
      <div className="mb-4">
        <label htmlFor="totalAmount" className="block text-gray-700 font-bold mb-2">
          Total Amount
        </label>
        <input
          type="text"
          id="totalAmount"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
          value={`$${totalAmount}`}
          readOnly
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleOnlinePayment}
        >
          Online Payment
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
          onClick={handleCashOnDelivery}
        >
          Cash on Delivery
        </button>
      </div>
    </div>
  );
};
