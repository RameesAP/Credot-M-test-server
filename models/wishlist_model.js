import mongoose from "mongoose";

const WishlistSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const WishlistModel = mongoose.model("Wishlist", WishlistSchema);

export default WishlistModel;
