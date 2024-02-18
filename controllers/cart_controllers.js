import CartModel from "../models/cart_model.js";
import ProductModel from "../models/product_model.js";

export const createCart = async (req, res) => {
  const { userId, productId, quantity, color, memory } = req.body;

  try {
    // Find the cart with the given userId
    let existingCart = await CartModel.findOne({ userId });

    if (!existingCart) {
      // If the cart doesn't exist, create a new one
      const newCart = new CartModel({
        userId,
        products: [
          {
            productId,
            quantity,
            color,
            memory,
          },
        ],
      });

      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } else {
      // If the cart exists, check if the product is already in the cart
      const existingProductIndex = existingCart.products.findIndex(
        (product) => product.productId === productId
      );

      if (existingProductIndex !== -1) {
        // If the product already exists, increase its quantity
        existingCart.products[existingProductIndex].quantity += quantity;
      } else {
        // If the product is not in the cart, add it with the specified quantity and other details
        existingCart.products.push({
          productId,
          quantity,
          color,
          memory,
        });
      }

      // Save the updated cart
      const savedCart = await existingCart.save();
      res.status(200).json(savedCart);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userCartProd = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    console.log(userId, "usssssssssssser");

    const userCart = await CartModel.findOne({ userId }).populate({
      path: "products.productId",
      model: ProductModel, // Replace with the actual model name for products
    });

    if (!userCart) {
      return res.status(404).json({ message: "User cart not found" });
    }

    // Access the products array and extract relevant details
    const products = userCart.products.map((product) => ({
      productId: product.productId._id,
      quantity: product.quantity,
      productDetails: {
        // Extract details from the populated product
        // Assuming 'name' and 'price' as properties, adjust as per your schema
        name: product.productId.title,
        price: product.productId.price,
        image: product.productId.img,
        instock: product.productId.instock,
        // Add more properties if needed
      },
    }));

    res.status(200).json({ products, message: "User cart found" });
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId, newQuantity } = req.body;
    const userId = req.params.userId;

    // Check if userId is available
    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    // Update the quantity in the database
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId, "products.productId": productId },
      { $set: { "products.$.quantity": newQuantity } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res
      .status(200)
      .json({ updatedCart, message: "Quantity updated successfully" });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteProductinCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ products: updatedCart.products });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
