import ownerSchema from "../models/owner.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const addOwner = async(req, res) => {
    const {name, age, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    try{
        const existingUser = await ownerSchema.findOne({ email });
            
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        
        const newOwner = new ownerSchema({
            name: name,
            age: age,   
            email: email,
            password: hashedPassword
        });

        
        newOwner.save().then((data)=>{
            const token = jwt.sign({ email },  process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRE_IN});
            res.status(201).json({data: data, token: token});
            console.log("Owner Created Successfully....");
        }).catch((err) => {
            res.json({error: err, msg: "Something went wrong"});
        });
        
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }

    // try{
    //     const {name, age, email, password} = req.body;
    //     const hashedPassword = await bcrypt.hash(password, 12);

    //     const ownerDetails = {
    //         name: name,
    //         age: age,
    //         email: email,
    //         password: hashedPassword
    //     }

    //     ownerSchema.create(ownerDetails).then((data)=>{
    //         console.log("Owner Created Successfully....");
    //         res.status(201).json(data);
    //     }).catch((err) => {
    //         res.json({error: err, msg: "Something went wrong"});
    //     });
    // }
    // catch(err){
    //     res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    // }
}

export const deleteOwner = (req, res) => {
    try{
        const {id} = req.params;
        ownerSchema.findByIdAndDelete(id).then(()=>{
            res.status(200).json({msg: "Owner Deleted Successfully"});
        }).catch((err)=>{
            res.json({error: err, msg: "Something went wrong"});
        });
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}

export const updateOwner = async(req, res) => {
    try{
        const {id} = req.params;
        const {name, age, email, password} = req?.body;
        const hashedPassword = await bcrypt.hash(password, 12);

        const ownerDetails = {
            name: name,
            age: age,
            email: email,
            password: hashedPassword
        }

        ownerSchema.findByIdAndUpdate(id, ownerDetails).then(()=>{
            res.status(200).json({msg: "Owner Updated Successfully"});
        }).catch((err)=>{
            res.json({error: err, msg: "Something went wrong"});
        });
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}

export const getOwner = async(req, res) => {
    try{
        const data = await ownerSchema.find();
        // const data = await ownerSchema.findOne({email: req.body.email});

        res.status(200).json({data: data})
    }
    catch(err){
        res.status(500).json({error: err, msg: `INTERNAL SERVER ERROR`});
    }
}