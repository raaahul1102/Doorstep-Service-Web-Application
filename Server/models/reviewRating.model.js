import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  serviceId:{
     type:mongoose.Schema.Types.ObjectId, ref:'Service'
  },
  rating: { type: Number, min: 1, max: 5 },
  reviewText: { type: String },
  dateTime: { type: Date, default: Date.now },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
