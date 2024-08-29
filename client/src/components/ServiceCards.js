import React from 'react'
import ServiceCategoriesCard from './ServiceCategoriesCard'
import './serviceCards.css'

export const ServiceCards = ({data}) =>{

  return (
    <>
     <h1 className="text-4xl font-bold text-center">Our Services</h1>
     <div className="bg-violet-400 h-[4px] w-1/5 mt-1 mx-auto"></div>
    <div className='categories-container'>
       
        {
            data.map((item,index)=>{
                return (<ServiceCategoriesCard key={index} item={item}/>)
            })
        }
    </div>
    </>
  )
}
