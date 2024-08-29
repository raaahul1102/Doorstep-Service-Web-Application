import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema({
  payer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  amount: { type: Number },
  paymentMethod: { type: String },
  transactionStatus: { type: String, enum: ['Successful', 'Pending', 'Failed'] },
  timestamp: { type: Date, default: Date.now },
});

const PaymentTransaction = mongoose.model('PaymentTransaction', paymentTransactionSchema);

module.exports = PaymentTransaction;
