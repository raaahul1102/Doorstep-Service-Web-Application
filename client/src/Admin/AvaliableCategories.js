import React,{useEffect,useState} from 'react'
import { CategoriesCard } from './CategoriesCard'
import axios from 'axios'
export const AvaliableCategories = () => {
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
  useEffect(()=>{
  getData()
  },[])
  return (
    <div className="flex justify-center items-center h-screen" style={{marginLeft:"180px"}}>
      <div className=" mx-auto grid grid-cols-1 gap-4">
        {categories.map(item => (
          <CategoriesCard key={item._id} item={item}/>
        ))}
      </div>
    </div>
  )
}
