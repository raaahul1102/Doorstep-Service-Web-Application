import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoriesImage:{
        type:String,
        require:true,

    },
    description: {
        type: String,
        required: true
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
}, { timestamps: true });

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
