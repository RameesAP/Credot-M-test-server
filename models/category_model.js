import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
});

const CategoryModel = mongoose.model("Category", CategorySchema);

export default CategoryModel;
