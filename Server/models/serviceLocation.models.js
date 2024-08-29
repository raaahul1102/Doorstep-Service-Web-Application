import mongoose from "mongoose";

const serviceLocationSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const City = mongoose.model('City', serviceLocationSchema);

export default City;