import { Router } from "express";
import { addOwner, deleteOwner, updateOwner, getOwner } from "../controller/crudController.js";
import { addVehicle, deleteVehicle, getVehicle, updateVehicle } from "../controller/vehicleCrudOperation.js";
import auth from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/add-owner", addOwner);
router.get("/get-owner", auth, getOwner);
router.delete("/delete-owner/:id", auth, deleteOwner);
router.put("/update-owner/:id", auth,updateOwner);

router.get("/get-vehicle", getVehicle);
router.post("/add-vehicle/:id", addVehicle);
router.delete("/vehicle/:id", deleteVehicle);
router.put("/vehicle/:id", updateVehicle);

export default router;