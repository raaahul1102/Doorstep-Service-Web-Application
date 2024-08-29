import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const CategoriesCard = ({ item }) => {
    async function removeHandler() {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/removecategories', { id: item._id });
            if (response.data.success) {
                toast.success('Category removed successfully');
                window.location.reload();
            } else {
                toast.error('Error in category removal');
               
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to remove category');
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <AiOutlineSafetyCertificate className="h-6 w-6 text-gray-600" />
                <span className="text-lg font-semibold">{item.name}</span>
            </div>
            <button onClick={removeHandler}>
                <RiDeleteBin2Line className="h-6 w-6 text-red-600 cursor-pointer" />
            </button>
        </div>
    );
};
