import mongoose from "mongoose";
import  {ServiceProvider} from '../models/serviceProvider.model.js'
const serviceSchema = new mongoose.Schema({
    serviceProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceProvider',
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    serviceDescription:{
        type:String,
        require:true,
    },
    serviceImage: {
        type: String, 
        required: true
    },
    serviceLocation:{
      type:String,
      required:true,
    },
    isAvalable:{
        type:Boolean,
        default:true,
    },
    price: {
        type: Number,
        required: true
    },
    rating:{
        type:Number,
        default:0
    }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
