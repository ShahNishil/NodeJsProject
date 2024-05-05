import mongoose from "mongoose";

const ownerSchema = mongoose.model("owner", new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
}));

export default ownerSchema; 