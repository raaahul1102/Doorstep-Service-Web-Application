import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  serviceType: { type: String, required: true },
  requestedDateTime: { type: Date },
  status: { type: String, enum: ['Pending', 'Confirmed', 'InProgress', 'Completed', 'Canceled'], required: true },
  notes: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'] },
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

module.exports = ServiceRequest;
