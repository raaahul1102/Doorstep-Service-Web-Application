
import {Order} from "../models/order.models.js";

export const addOrder = async (req, res) => {
  try {
    console.log(req.body)
    const { name,contactNumber,services, customerId, providers, totalAmount, address } = req.body;
    const newOrder = new Order({
      name,
      contactNumber,
      services,
      customerId,
      providers,
      totalAmount,
      address
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
        success:true,
         message: 'Order created successfully', 
         order: savedOrder 
        });
  } 
  catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({ message: 'An error occurred while adding the order' });
  }
};

export const allOrder = async (req, res) => {
    try {
        const { id } = req.body;
      console.log(id)
        const orders = await Order.find({ customerId: id })
            .populate('services.service')
            // .populate('customerId')
            .populate('providers');

        return res.status(200).json({
            success: true,
            orders,
            message: "All orders with populated details"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};