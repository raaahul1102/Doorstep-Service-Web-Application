
import React, { useState, useEffect } from 'react';
import './serviceProviderForm.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ServiceProviderForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const URL = 'http://localhost:5000/api/v1/categories'
    const getDataCategories = async () => {
        try {
            const response = await axios.get(URL)

            const data = response.data
            console.log(data)
            if (data.success) {
                setCategories(data.categories)
            }

        }
        catch (error) {
            console.log(error)
        }
    }
    console.log("26", categories)
    const [cities, setCities] = useState([]);
    const API = 'http://localhost:5000/api/v1/allcities';

    const getData = async () => {
        try {
            const response = await axios.get(API)

            const data = response.data
            console.log(data)
            if (data.sucess) {
                setCities(data.cities)
                console.log("33", data.cities)
            }

        }
        catch (error) {
            console.log(error)
        }
    }
   
    //setCities("patna")
    //console.log(cities)
    console.log("31", cities)
    useEffect(() => {
        getData()
        getDataCategories()
    }, [])

    const [serviceTypes, setServiceTypes] = useState();
    const [serviceArea, setServiceArea] = useState('');
    const [certifications, setCertifications] = useState('');
    const [photo, setPhoto] = useState('');
    const [adharNumber, setAdharNumber] = useState('');
    const [businessInformation, setBusinessInformation] = useState('');
    let userId = localStorage.getItem('user')
    userId = userId.replace(/^"(.*)"$/, '$1');
    const API_URL = 'http://localhost:5000/api/v1/application'

    const token = localStorage.getItem("Token")
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('userId', userId)
            formData.append('serviceTypes', serviceTypes)
            formData.append('serviceArea', serviceArea)
            formData.append('certifications', certifications)
            formData.append('photo', photo)
            formData.append('adharNumber', adharNumber)
            formData.append('businessInformation', businessInformation)
            const response = await axios.post(API_URL, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            toast.success('Applied sucessfully')
            navigate('/')


        }
        catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="service-provider-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="serviceTypes">Service Categories:</label>
                    <select
                        id="serviceTypes"
                        value={serviceTypes}
                        onChange={(e) => setServiceTypes(e.target.value)}
                    >
                        {categories.map((categorie, index) => (
                            <option key={index} value={categorie.name}>{categorie.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="serviceArea">Service Area:</label>
                    <select
                        id="serviceArea"
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                    >
                        {cities.map((city, index) => (
                            <option key={index} value={city.city}>{city.city}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo:</label>
                    <input
                        type="file"
                        id="photo"
                        name='photo'
                        onChange={(e) => setPhoto(e.target.files[0])}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Certifications:</label>
                    <input
                        type="file"
                        id="certifications"
                        name='certifications'
                        onChange={(e) => setCertifications(e.target.files[0])}

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="adharNumber">Adhar Number:</label>
                    <input
                        type="text"
                        id="adharNumber"
                        value={adharNumber}
                        onChange={(e) => setAdharNumber(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="businessInformation">Business Information:</label>
                    <textarea
                        id="businessInformation"
                        value={businessInformation}
                        onChange={(e) => setBusinessInformation(e.target.value)}
                    ></textarea>
                </div>
                <button className='submit-btn' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ServiceProviderForm;
