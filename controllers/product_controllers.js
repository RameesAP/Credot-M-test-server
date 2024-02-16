import ProductModel from "../models/product_model.js";
import { errorHandler } from "../utils/error.js";

export const createProduct = async (req, res, next) => {
  const newProduct = new ProductModel(req.body);
  try {
    const productSaved = await newProduct.save();
    res.status(200).json(productSaved);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted...");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getall = async (req, res) => {
  try {
    const AllPro = await ProductModel.find();
    res.status(200).json(AllPro);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await ProductModel.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};
