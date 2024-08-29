import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './createservice.css'; // Import CSS file for styling
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CreateService = () => {
    const user = useSelector(state => state.user.userDetails);
    const [application, setApplication] = useState(null);
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:5000/api/v1/getapplication', { user: user });
                setApplication(response.data.application);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching application:', error);
            }
        }
        fetchData();
    }, [user]);

    //const [serviceName, setServiceName] = useState(application[0].serviceTypes);
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceImage, setServiceImage] = useState('');
   // const [serviceLocation, setServiceLocation] = useState(application[0].serviceArea);
    const [price, setPrice] = useState(0);

    const handleDescription = (e) => {
        setServiceDescription(e.target.value);
    };

    const handleImage = (e) => {
        setServiceImage(e.target.files[0]);
    };

    const handlePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = new FormData();
            postData.append('user', user);
           // postData.append('serviceName', serviceName);
            postData.append('serviceDescription', serviceDescription);
            postData.append('serviceImage', serviceImage);
           // postData.append('serviceLocation', serviceLocation);
            postData.append('price', price);

            await axios.post('http://localhost:5000/api/v1/createservices', postData);
            toast.success('Service created successfully!');
             window.location.reload();
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Failed to create service. Please try again.');
        }
    };

    // if (!application) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>{
            loading?(<div>Loading...</div>):
            (<div className="form-container">
            <h2 style={{textAlign:"center",fontSize:"20px",font:"bold"}}>Create Service</h2>
            <form  className='create-service-form' onSubmit={handleSubmit} style={{marginTop:"20px"}}>
                {/* <div>
                    <label>Service Name:</label>
                    <input type="text" name="serviceName" value={application[0].serviceTypes} readOnly />
                </div> */}
                <div>
                    <label>Service Description:</label>
                    <textarea name="serviceDescription" value={serviceDescription} onChange={handleDescription} required />
                </div>
                <div>
                    <label>Service Image:</label>
                    <input type="file" id='serviceImage' name="serviceImage" onChange={handleImage} required />
                </div>
                {/* <div>
                    <label>Service Location:</label>
                    <input type="text" name="serviceLocation" value={application[0].serviceArea} readOnly />
                </div> */}
                <div>
                    <label>Price (in dollars):</label>
                    <input type="number" name="price" value={price} onChange={handlePrice} required />
                </div>
                <button type="submit">Create Service</button>
            </form>
        </div>)
        }
        
        </>
    );
};

export default CreateService;
