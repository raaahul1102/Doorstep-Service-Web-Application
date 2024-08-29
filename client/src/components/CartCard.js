import React from 'react';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { remove } from '../redux/slices/cartSlice';
import { UseDispatch, useDispatch } from 'react-redux';
const CartCard = ({ data }) => {
    const dispatch=useDispatch();
    function removeFromCartHandler(){
        //const id=data._id;
        dispatch(remove(data))
    }
  return (
    <div className="relative flex items-center justify-between  md:w-80 h-40 md:h-300 bg-white shadow-md rounded-lg p-4 mt-12 w-80 mx-auto">
      <div className="w-24" style={{width:"300px",height:"150px"}}>
        <img src={data.serviceImage} alt={data.serviceName} className="w-full h-full object-cover rounded-lg"  />
      </div>
      <div className="w-2/3 px-4">
        <h2 className="text-lg font-semibold mb-2">{data.serviceName}</h2>
        <p className="text-gray-700">${data.price}</p>
      </div>
      <div className="absolute top-2 right-2">
        <MdOutlineDeleteOutline onClick={removeFromCartHandler} className="text-red-500 text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default CartCard;
