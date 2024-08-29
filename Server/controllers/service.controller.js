import Categories from "../models/categories.model.js";
import Service from "../models/service.models.js";
import {ServiceProvider} from '../models/serviceProvider.model.js'
export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Categories are not available",
            });
        }
        return res.status(200).json({
            success: true,
            categories,
            message: "Categories retrieved successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getAllServices=async(req,res)=>{
    try{
        const services=await Service.find()
        return res.status(200).json({
            success:true,
            services,
            message:"All the service are"

        })

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}
