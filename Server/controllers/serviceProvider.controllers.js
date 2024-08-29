
import {ServiceProvider} from '../models/serviceProvider.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { User } from '../models/user.model.js';
import Service from '../models/service.models.js';
import { Order } from '../models/order.models.js';
import mongoose from 'mongoose'
export const serviceProviderApplication= async (req, res) => {
    try {
       console.log("8",req.body);
        const { userId,serviceTypes, serviceArea, adharNumber, businessInformation } = req.body
        if (!serviceTypes || !serviceArea  || !adharNumber || !businessInformation) {
            return res.status(400).json({
                sucess: false,
                message: "All field are required",
            })
        }
       // const userId = req.user._id;
     console.log("17",userId)
        const image = req.files?.photo[0]?.path;
        if (!image) {
            return res.status(400).json({
                sucess: false,
                message: "Image is required",
            })
        }
        const certification = req.files?.certifications[0].path;
        if (!certification) {
            return res.status(400).json({
                sucess: false,
                message: "certification is required",
            })
        }
       // const photo = await uploadOnCloudinary(image)
        //const certifications = await uploadOnCloudinary(certification)
        // if (!photo || !certifications) {
        //     return res.status(400).json({
        //         sucess: false,
        //         message: "certification and image  is required",
        //     })
        // }
        const application = await ServiceProvider.create({
            user: userId,
            serviceTypes: serviceTypes,
            serviceArea: serviceArea,
            // schedule: schedule,
            adharNumber: adharNumber,
            businessInformation: businessInformation,
            certifications: certification,
            photo:image,
        })

        return res.status(201).json({
            sucess: true,
            message: "Application sent sucessfully",

        }

        )
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            sucess: false,
            message: "Internal server error",
        })
    }
}

export const createServices = async (req, res) => {
    try {
        const {user,serviceDescription,price} = req.body;
         console.log(req.body.user)
        if(!user || !price || !serviceDescription){
            return res.status(400).json({
                sucess:false,
                message:"All field are required"
            })
        }
        //const serviceProvider=req.user._id
        // Create a new service instance
        const application=await ServiceProvider.find({user:user})
        console.log(application[0].serviceTypes[0])
        const serviceName=application[0].serviceTypes[0]

        const serviceLocation=application[0].serviceArea
        
        const image=req.file.path
        console.log(req.file.path)
        // const serviceImage=await uploadOnCloudinary(image)
        const newService = new Service({
            serviceProvider:user,
            serviceName,
            serviceDescription,
            serviceLocation,
            serviceImage:image,
            price
        });

        // Save the new service to the database
        const savedService = await newService.save();

        // If the service is saved successfully, send a success response
       return res.status(201).json({
            success: true,
            message: 'Service created successfully',
            service: savedService
        });
    } catch (error) {
        // If an error occurs during service creation, send an error response
        console.error('Error creating service:', error);
      return  res.status(500).json({
            success: false,
            message: 'Failed to create service',
            error: error.message
        });
    }
}

export const changeAvailability = async (req, res) => {
    try {
        const { serviceId } = req.body;
        console.log(req.body)
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        // Toggle the availability
        service.isAvalable = !service.isAvalable;
        await service.save();

        return res.status(200).json({
            success: true,
            message: "Availability changed successfully",
            service: service
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}


export const editService = async (req, res) => {
    try {
        const { serviceName, price } = req.body;
        const { serviceId } = req.params;

        // Check if required fields are provided
        if (!serviceName || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Find the service by ID
        let service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found"
            });
        }

        // Update service details
        service.serviceName = serviceName;
        service.price = price;

        // If there's a new service image provided, update it
        if (req.files && req.files.serviceImage && req.files.serviceImage[0]) {
            const image = req.files.serviceImage[0].path;
            const serviceImage = await uploadOnCloudinary(image);
            service.serviceImage = serviceImage;
        }

        // Save the updated service to the database
        const updatedService = await service.save();

        // Send success response
        return res.status(200).json({
            success: true,
            message: 'Service updated successfully',
            service: updatedService
        });
    } catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to update service',
            error: error.message
        });
    }
}

export const getProviderServices=async(req,res)=>{
    console.log("hi")
    try{
        const {providerId}=req.body;
        console.log("203",req.body)
        if(!providerId){
            return res.status(400).json({
                success: false,
                message: "Id is not avalable"
            });
        }
        const services=await Service.find({serviceProvider:providerId})
        if(!services){
            return res.status(404).json({
                success:false,
                message:"Service not found",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Service get sucessfully",
            services,
        })
    }
    catch(error){
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message
        });
    }
}


export const getServicesById=async(req,res)=>{
    try{
        const {serviceId}=req.params;
        if(!serviceId){
            return res.status(400).json({
                success: false,
                message: "Id is not avalable"
            });
        }
        const service=await Service.findById({serviceId})
        if(!service){
            return res.status(404).json({
                sucess:false,
                message:"Service not found",
            })
        }
        return res.status(200).json({
            sucess:true,
            message:"Service get sucessfully",
            service,
        })


    }
    catch(error){
        console.error('Error:', error);
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: error.message
        });
    }
}

export const getApplication=async (req,res)=>{
    try{
        const {user}=req.body
        console.log(user)
        const application =await ServiceProvider.find({user:user})
        if(!application){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        return res.status(200).json({
            success:true,
            application,
            message:'Provider Application'
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        })

    }
}


export const getServicesByProviderId = async (req, res) => {
    try {
      const { providerId } = req.body;
  
      // Find all orders where the providerId matches
      const orders = await Order.find({ 'providers.provider': providerId });
  
      // Extract relevant information from orders
      const services = orders.flatMap(order => {
        return order.services.map(service => ({
          orderId: order._id,
          serviceName: service.service.serviceName,
          price: service.service.price,
          description: service.service.serviceDescription,
          delivered: service.delivered,
          BookingStatus:service.BookingStatus,
          customerName: order.address.name,
          contactNumber: order.address.contactNumber,
          buildingNumber: order.address.buildingNumber,
          city: order.address.city,
          road: order.address.road,
          pincode: order.address.pincode,
          paymentMode: order.paymentMode
        }));
      });
  
      res.status(200).json({
         success:true,
         services,
         message:"All service" });
    } catch (error) {
      console.error('Error fetching services by provider ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const outforDelivery = async (req, res) => {
    try {
      const { serviceId, providerId } = req.body;
    
      // Find the order containing the service with the provided serviceId
      const orderContainingService = await Order.findOne({
        'providers.provider': providerId,
        'services._id': mongoose.Types.ObjectId(serviceId)
      });
    
      if (!orderContainingService) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
    
      // Find the service to update
      const serviceToUpdate = orderContainingService.services.find(service =>
        service._id.equals(mongoose.Types.ObjectId(serviceId))
      );
    
      if (!serviceToUpdate) {
        return res.status(404).json({ success: false, message: 'Service not found' });
      }
    
      // Update the booking status of the service
      serviceToUpdate.BookingStatus = 'Out for Delivery';
      await orderContainingService.save();
    
      res.status(200).json({ success: true, message: 'Booking status updated to Out for Delivery' });
    } catch (error) {
      console.error('Error updating booking status to Out for Delivery:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };