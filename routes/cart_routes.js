import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  createCart,
  deleteProductinCart,
  updateQuantity,
  userCartProd,
} from "../controllers/cart_controllers.js";

const router = express.Router();

router.post("/create", createCart);
router.get("/usercartprod/:userId", userCartProd);
router.put("/updateQuantity/:userId", updateQuantity);
router.delete("/removeproduct/:userId/:productId",deleteProductinCart)

export default router;
