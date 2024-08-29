import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
