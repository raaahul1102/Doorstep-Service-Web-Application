import React from 'react';
import Menu from './Menu';
import { useState } from 'react';
import  Application  from './Application';
import  AddCategories  from './AddCategories';
import AddCity from './AddCity';
// import { SeeServices } from './SeeServices';
import { AvaliableCategories } from './AvaliableCategories';
import { AvaliableCities } from './AvaliableCities';
import AllServices from './AllServices';

const AdminDashboard = () => {
    const [selectedMenu, setSelectedMenu] = useState('Application');
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenu(menuItem);
  };

 
  const renderContent = () => {
    switch (selectedMenu) {
      case 'Application':
        return <Application/>;
       case 'Add Categories':
        return <AddCategories/>;
      case 'Add Cities':
        return <AddCity/>;
      case 'All Service':
        return <AllServices/>;
      case 'Available Categories':
        return <AvaliableCategories/>;
      case 'Available Cities':
        return <AvaliableCities/>;

      default:
        return null;
    }
  };
  return (
    <div className="flex min-h-screen">
      <div className="w-3/10 bg-gray-200">
        <Menu  handleMenuItemClick={handleMenuItemClick} />
      </div>
      <div className="w-7/10 bg-white">
      {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
