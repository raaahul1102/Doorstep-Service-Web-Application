import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddCategories = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  console.log(image)
const URL='http://localhost:5000/api/v1/addcategory'
  const handleSubmit = async(event) => {
    event.preventDefault();
      try{
        const formData = new FormData();
        formData.append('categoryName',categoryName)
        formData.append('description',description)
        formData.append('image',image)
       const response=await axios.post(URL,formData)
       const data=response.data;
       if(data.success){
        toast.success('new Categories created');
       }
       else{
        toast.error('Error in creating new categories')
       }
      }
      catch(error){
        console.log(error)
        toast.error('Error in creating new categories')
      }
  
  };

  return (
    <div className="flex justify-center items-center h-screen"  style={{backgroundImage: `url('/add categories-bg.jpg')`}}
    >
    <div className="mx-auto max-w-md p-6 bg-white rounded-md shadow-md text-center">
      <h1 className="text-2xl font-semibold mb-4 relative">
        <span className="pb-1 border-b-2 border-blue-500">Add Category</span>
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-gray-700 font-semibold mb-2">Category Name</label>
          <input type="text" id="categoryName" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" value={categoryName} onChange={handleNameChange} required />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea id="description" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" rows="4" value={description} onChange={handleDescriptionChange} required></textarea>
        </div>
        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
          <input type="file" id="image" name='image' className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"  onChange={handleImageChange} required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">Submit</button>
      </form>
    </div>
  </div>
  

  
  );
};

export default AddCategories;
