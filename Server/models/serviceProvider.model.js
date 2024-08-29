import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceTypes: [{ type: String,required:true }],
  serviceArea: { type: String ,require:true},
  ratings: { type: Number,default:0 },
  certifications: { type: String,require:true },
  photo:{type:String},
  status:{
    type:String,
    enum: ['Pending', 'Verified', 'Rejected'],default:'Pending'
  },
  adharNumber:{
    type:String,
    require:true,
    },
  businessInformation: { type: String },
});

export const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);


