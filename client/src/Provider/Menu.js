import React from 'react';
import { AiOutlineAppstore, AiOutlinePlus, AiOutlineEnvironment, AiOutlineEye, AiOutlineLogout, AiOutlineCheckCircle } from 'react-icons/ai';

const Menu = ({ handleMenuItemClick }) => {
  return (
    <div>
      <ul>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Application')}>
          <AiOutlineAppstore className="mr-2" />
          Application
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Create Service')}>
          <AiOutlinePlus className="mr-2" />
          Create Service
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('availability')}>
          <AiOutlineEnvironment className="mr-2" />
          Update availability
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('see booking')}>
          <AiOutlineEye className="mr-2" />
          See Booking
        </li>
        {/* <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Available Categories')}>
          <AiOutlineCheckCircle className="mr-2" />
          Available Categories
        </li>
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Available Cities')}>
          <AiOutlineCheckCircle className="mr-2" />
          Available Cities
        </li> */}
        <li className="flex items-center py-2 px-4 cursor-pointer hover:bg-gray-300" onClick={() => handleMenuItemClick('Logout')}>
          <AiOutlineLogout className="mr-2" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Menu;
