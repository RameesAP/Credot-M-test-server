import Admin from "../models/admin_model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import CategoryModel from "../models/category_model.js";
import ProductModel from "../models/product_model.js";

// if you need to create new admin please uncomment this code and use this route 


// export const AdminSignUp = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   console.log(username,email,password);
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newAdmin = new Admin({ username, email, password: hashedPassword });
//   try {
//     await newAdmin.save();
//     res.status(201).json("admin created succesfully");
//   } catch (error) {
//     next(error);
//   }
// };

export const AdminSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validAdmin = await Admin.findOne({ email });
    if (!validAdmin) return next(errorHandler(404, "Admin not found"));
    const validPassword = bcryptjs.compareSync(password, validAdmin.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validAdmin._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req, res, next) => {
  const newCategory = new CategoryModel(req.body);
  try {
    const CategorySaved = await newCategory.save();
    res.status(200).json(CategorySaved);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  const newProduct = new ProductModel(req.body);
  try {
    const productSaved = await newProduct.save();
    res.status(200).json(productSaved);
  } catch (error) {
    console.error('Error creating product:', error);

    // Check for specific error conditions and send appropriate status codes
    if (error.name === 'ValidationError') {
      // Handle validation errors (e.g., required fields missing)
      res.status(400).json({ message: 'Fields are missing', errors: error.errors });
    } else {
      // For other errors, send a generic 500 Internal Server Error response
      res.status(500).json({ message: 'Failed to create product' });
    }

    // Pass the error to the next middleware (e.g., error handling middleware)
    next(error);
  }
};
