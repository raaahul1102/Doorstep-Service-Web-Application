import {ServiceProvider} from '../models/serviceProvider.model.js';
import City from '../models/serviceLocation.models.js';
import Categories from '../models/categories.model.js';
import { User } from '../models/user.model.js';
import Service from '../models/service.models.js';
export const verifyServiceProviderApplication = async (req, res) => {
    try {
        const { appId, status,id} = req.body;

        // Check if applicationId and status are provided
        if (!appId || !status) {
            return res.status(400).json({
                success: false,
                message: "Application ID and status are required."
            });
        }

        // Check if the status is valid
        if (!['Pending', 'Verified', 'Rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status provided."
            });
        }

        // Find the service provider application by ID
        const application = await ServiceProvider.findById(appId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found."
            });
        }


        application.status = status;
        await application.save();
        if(application.status=='Verified'){
            const user=await User.findById(id)
            console.log(user)
            user.role='Service Provider';
            await user.save()
            return res.status(200).json({
                success: true,
                message: "Application status updated successfully."
            });
        }
       
        return res.status(200).json({
            success: true,
            message: "Application status updated successfully."
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};


export const getAllPendingApplication = async (req, res) => {
    try {
        const applications = await ServiceProvider.find({ status: "Pending" }).populate('user');
        res.status(200).json({
            success: true,
            pendingApplications: applications,
            message: "All pending applications"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}


export const AddCity = async (req, res) => {
    try {
        const { city} = req.body;

        console.log(req.body)
        const updatedCity = await City.create({ city: city});

        return res.status(200).json({
            success: true,
            updatedCity,
            message: "New city added successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getAllCity=async(req,res)=>{
    try{
        const cities=await City.find()
        return res.status(200).json({
            sucess:true,
            cities,
            message:"List of cities where service is avaliable",
        })

    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:"Internal server error",
        })
    }
}
export const removeCities=async(req,res)=>{
    try{
        const {id}=req.body;
        const city=await City.findByIdAndDelete(id);
        if(!city){
            return res.status(404).json({
                success:false,
                message:"City not found",

            })
        }
        return res.status(200).json({
            success:true,
            city,
            message:"City with provided id is removed"
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}


export const AddCategories=async(req,res)=>{
    try{
        const {categoryName, description}=req.body;
       // console.log(req.file)
       // console.log(req.body)
          if(! categoryName || !description){
            return res.status(201).json({
                sucess:false,
                message:"All field are required",
            })
          }
            const categoriesImage=req.file.path
           // console.log("160",categoriesImage)
            const newCategories= await Categories.create({
                name:categoryName,
                categoriesImage,
                description,
             })
             return res.status(200).json({
                success:true,
                newCategories,
                message:"Categories added sucessfully",
             })
    }
    catch(error){
        cconsole.log(error)
        return res.status(500).json({
           sucess:true,
           message:"Internal server error", 
        })
    }
}
export const removeCategories=async(req,res)=>{
    try{
        const {id}=req.body;
        const categories=await Categories.findByIdAndDelete(id);
        if(!categories){
            return res.status(404).json({
                success:false,
                message:"Categories not found",

            })
        }
        return res.status(200).json({
            success:true,
            categories,
            message:"Categories with provided id is removed"
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}
export const removeServices=async(req,res)=>{
    try{
    const {id}=req.body
       console.log("211",id)
      const service=await Service.findByIdAndDelete(id)
      console.log(service)
      res.status(200).json({
        success:true,
        message:"Service removed sucessfully",
      })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}