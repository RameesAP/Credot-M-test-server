import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getall,
  updateProduct,
} from "../controllers/product_controllers.js";

const router = express.Router();

router.post("/createproduct", createProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/getallpro", getAllProducts);
router.get("/getall", getall);
router.get("/find/:id", getProduct);
router.put("/:id", updateProduct);
router.get("/categorybased,")

export default router;
