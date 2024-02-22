import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    img: {
      type: Array,
      require: true,
    },
    categories: {
      type: String,
      require: true,
    },
    memory: {
      type: Array,
      require: true,
    },
    color: {
      type: Array,
    },
    price: {
      type: Number,
      require: true,
    },
    instock: {
      type: Boolean,
      default: true,
    },
    overview: {
      type: Array,
      require: true,
    },
    specifications: {
      type: Array,
      require: true,
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
