import React, { useEffect, useState } from 'react';
import './servicelist.css'
import axios from 'axios'
import { useSelector } from 'react-redux';
import {toast} from 'react-hot-toast'
const ServiceList = ({service}) => {
  //  const user = useSelector(state => state.user.userDetails);
   // const [service, setService] = useState([])
    const [availability, setAvailability] = useState(service[0].isAvalable);
    const [loading, setLoading] = useState(true)
    const toggleAvailability =async () => {
             try{
                const response = await axios.post('http://localhost:5000/api/v1/updateavailability',{serviceId:service[0]._id})
                if(response.data.success){
                    setAvailability(!availability);
                    toast.success('Your avalibility updated sucessfully')
                    window.location.reload();
                }
                else{
                    toast.error('Error in updating availibility')
                }
                  
             }
             catch(error){
                console.log(error)
             }
       
    }
// console.log("14",user);
// const getService = async () => {
//     try {
//         const response = await axios.post('http://localhost:5000/api/v1/updateavailability', { providerId: user });
//         const data = response.data;
//         console.log("19", response);
//         if (data.success) {
//             setService(data.services);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

//     useEffect(() => {
//         getService()
//     }, [])
    if (!service) {
        return <div>Loading......</div>
    }

    return (
        <div className="service-item">
            <div className="service-image">
                <img src={`http://localhost:5000/${service[0].serviceImage}`} alt={service[0].serviceName} />
            </div>
            <div className="service-details">
                <h3>{service[0].serviceName}</h3>
                <p>{service[0].serviceDescription}</p>
                <p>Location: {service[0].serviceLocation}</p>
                <p>Price: ${service[0].price}</p>
                <p>Rating: {service[0].rating}</p>
                <button onClick={toggleAvailability}>
                    {service[0].
                        isAvalable ? 'Available' : 'Not Available'}
                </button>
            </div>
        </div>
    );
};

export default ServiceList;
