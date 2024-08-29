import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, enum: ['Admin', 'SuperAdmin'], required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
