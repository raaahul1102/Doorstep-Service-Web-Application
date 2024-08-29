import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['Read', 'Unread'], default: 'Unread' },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

