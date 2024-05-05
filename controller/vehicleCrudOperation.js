import vehicleSchema from "../models/vehicle.js";

export const addVehicle = async(req, res) => {
    try{
        const {name, vehicleNumber} = req.body;
        const {id} = req.params;

        const vehicleDetails = new vehicleSchema({
            name: name,
            vehicleNumber: vehicleNumber,
            owner: id,
        });

        vehicleDetails.save().then((data)=>{
            console.log("Vehicle Created Successfully....");
            res.status(201).json({data: data});
        }).catch((err) => {
            res.json({error: err, msg: "Something went wrong"});
        });
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}

export const getVehicle = async(req, res) => {
    try{
        const data = await vehicleSchema.find().populate("owner");
        // const data = await vehicleSchema.find({name: "activa"}).populate("owner");

        res.status(200).json({data: data})
 
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}

export const deleteVehicle = (req, res) => {
    try{
        const {id} = req.params;
        vehicleSchema.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg: "Vehicle Deleted Successfully"});
        }).catch((err)=>{
            res.json({error: err, msg: "Something went wrong"});
        });
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}

export const updateVehicle = async(req, res) => {
    try{
        const {id} = req.params;

        const vehicleDetails = req.body;

        vehicleSchema.findByIdAndUpdate(id, vehicleDetails).then(()=>{
            res.status(200).json({msg: "Vehicle Updated Successfully"});
        }).catch((err)=>{
            res.json({error: err, msg: "Something went wrong"});
        });
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}
