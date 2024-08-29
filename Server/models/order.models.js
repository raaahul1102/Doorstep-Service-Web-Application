import mongoose from 'mongoose';
import Service from './service.models.js';
import { User } from './user.model.js';

const orderSchema = new mongoose.Schema({
  services: [
    {
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
      delivered: {
        type: String,
        default: "60min",
      },
      BookingStatus:{
        type:String,
        enum:['Pending','Out for Delivery','Completed'],
        default:'Pending',
      }
    },
  ],
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  providers: [
    {
      provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
      },
    },
  ],
  totalAmount: Number,
  address: {
    name: String,
    contactNumber: String,
    buildingNumber: String,
    city: String,
    road: String,
    pincode: String,
  },
  paymentMode: {
    type: String,
    enum: ['COD', 'online'],
    default: 'COD', 
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);


function decrementDelivered(orderId) {
  setTimeout(async () => {
    const order = await Order.findById(orderId);
    if (!order) return; // Order not found, terminate function

    // Decrement delivered field value
    order.services.forEach(service => {
      const currentValue = parseInt(service.delivered);
      if (!isNaN(currentValue) && currentValue > 0) {
        service.delivered = `${currentValue - 1}min`;
      }
    });

    await order.save(); // Save the updated order
    decrementDelivered(orderId); // Call the function recursively for the next minute
  }, 60 * 1000); // 1 minute in milliseconds
}

// Middleware to start the decrementDelivered function after order creation
orderSchema.post('save', function(order, next) {
  decrementDelivered(order._id);
  next();
});

export { Order };
