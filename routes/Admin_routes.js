import express from "express";
import {
  AdminSignIn,
  createCategory,
  createProduct,
  // , AdminSignUp
} from "../controllers/admin_controllers.js";

const router = express.Router();

// if you need to create new admin please uncomment this code and use this route

// router.post("/signup", AdminSignUp);
router.post("/signin", AdminSignIn);
router.post("/addcategory", createCategory);
router.post("/addproduct", createProduct);

export default router;
