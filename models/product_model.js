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
      type: String,
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
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
