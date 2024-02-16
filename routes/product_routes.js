import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product_controllers.js";

const router = express.Router();

router.post("/createproduct", createProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/getallpro", getAllProducts);
router.get("/getproduct/:id", getProduct);
router.put("/:id", updateProduct);

export default router;