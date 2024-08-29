import React from 'react';
import { AiOutlineAppstore, AiOutlinePlus, AiOutlineEnvironment, AiOutlineEye, AiOutlineLogout, AiOutlineCheckCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const Menu = ({ handleMenuItemClick }) => {
  const navigate=useNavigate()
    function handleLogout(){
      localStorage.removeItem("Token")
      navigate('/login')
    }
  return (
    <div>
      <ul>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Application')}>
          <AiOutlineAppstore className="mr-2" />
          Application
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Add Categories')}>
          <AiOutlinePlus className="mr-2" />
          Add Categories
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Add Cities')}>
          <AiOutlineEnvironment className="mr-2" />
          Add Cities
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('All Service')}>
          <AiOutlineEye className="mr-2" />
          See Service
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Available Categories')}>
          <AiOutlineCheckCircle className="mr-2" />
          Available Categories
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Available Cities')}>
          <AiOutlineCheckCircle className="mr-2" />
          Available Cities
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={handleLogout}>
          <AiOutlineLogout className="mr-2" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Menu;
