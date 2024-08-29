import React, { useEffect } from 'react'
import Menu from './Menu';
import { useState } from 'react';
 import { Application } from './Application';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CreateService from './CreateService';
import './dashboard.css'
import ServiceList from './ServiceList';
import Services from './Services';

export const DashBoard = () => {
  const [service,setService]=useState([])
  const user = useSelector(state => state.user.userDetails);
  const getService = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/v1/getservicebyid', { providerId: user });
        const data = response.data;
        console.log("19", response);
        if (data.success) {
            setService(data.services);
        }
    } catch (error) {
        console.log(error);
    }
}

    useEffect(() => {
        getService()
    }, [])
    console.log(service)
    const [selectedMenu, setSelectedMenu] = useState('Application');

    const handleMenuItemClick = (menuItem) => {
      setSelectedMenu(menuItem);
    };
  
    const renderContent = () => {
      switch (selectedMenu) {
        case 'Application':
          return <Application/>;
         case 'Create Service':
          return <CreateService/>;
        case 'availability':
          return <ServiceList  service={service}/> ;
        case 'see booking':
          return <Services/>;
        // case 'Available Categories':
        //   return <AvaliableCategories/>;
        // case 'Available Cities':
        //   return <AvaliableCities/>;
  
        default:
          return null;
      }
    };
    return (
      <div className="flex min-h-screen">
        <div className="w-3/10 bg-gray-200">
          <Menu  handleMenuItemClick={handleMenuItemClick} />
        </div>
        <div className="dash-right">
        {renderContent()}
        </div>
      </div>
    );
}
