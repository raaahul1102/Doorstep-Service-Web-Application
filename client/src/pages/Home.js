import React, { useEffect, useState } from 'react'
import { Crausal } from '../components/Crausal'
import { ServiceCards } from '../components/ServiceCards'
import Testimonials from '../components/Testimonials'
import {useDispatch} from 'react-redux'
import { addServices } from '../redux/slices/serviceSlice'
import axios from 'axios'
export const Home = () => {
  const dispatch=useDispatch()
  console.log("7",localStorage.getItem('user'))
  const [categories,setCategories]=useState([])
const API='http://localhost:5000/api/v1/categories'
  const getData=async()=>{
    try{
       const response=await axios.get(API)
       
       const data=response.data
       console.log(data)
       if(data.success){
          setCategories(data.categories)
       }

    }
    catch(error){
      console.log(error)
    }
  }
  const API_URL='http://localhost:5000/api/v1/services'
  const getAllServices=async()=>{
    try{
      const response=await axios.get(API_URL)
       console.log(response.data.services)
       const data=response.data;
       if(data.success){
        dispatch(addServices(response.data.services))
       }
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getData()
    getAllServices()
  },[])
  console.log(categories)
  console.log(localStorage.getItem("Token"))
  return (
    <div>
      <Crausal/>
      <ServiceCards data={categories}/>
      <Testimonials/>
    </div>
  )
}
