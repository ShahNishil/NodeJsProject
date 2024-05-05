import mongoose from "mongoose";

const vehicleSchema = mongoose.model('vehicle', new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    vehicleNumber:{
        type: String,
        required: true,
    },
    owner:{
        ref: "owner",
        type: mongoose.Schema.Types.ObjectId,
    }
}));

export default vehicleSchema;