import React from 'react';
import { RiDeleteBin2Line, RiMapPin2Line } from 'react-icons/ri';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LocationCard = ({item}) => {
  async function removeHandler() {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/removecity', { id: item._id });
        if (response.data.success) {
            toast.success('City removed successfully');
            window.location.reload();
        } else {
            toast.error('Error in city removal');
           
        }
    } catch (error) {
        console.log(error);
        toast.error('Failed to remove city');
    }
}

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <RiMapPin2Line className="h-6 w-6 text-gray-600" />
        <span className="text-lg font-semibold">{item.city}</span>
      </div>
      <button>
        <RiDeleteBin2Line className="h-6 w-6 text-red-600 hover:text-red-800 cursor-pointer" onClick={removeHandler} />
      </button>
    </div>
  );
};
export default LocationCard;
