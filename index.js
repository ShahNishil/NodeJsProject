import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database Connected Successfully.......")
    app.listen(8000, ()=>{
        console.log("listening.........");
    });
})
.catch(err => console.log(err));