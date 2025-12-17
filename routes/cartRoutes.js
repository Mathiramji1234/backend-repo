const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// ADD TO CART
router.post("/", async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;

    const existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = new Cart({
      productId,
      name,
      price,
      image
    });

    await newItem.save();
    res.json(newItem);

  } catch (err) {
    res.status(500).json(err);
  }
});

// GET CART ITEMS
router.get("/", async (req, res) => {
  const cartItems = await Cart.find();
  res.json(cartItems);
});

module.exports = router;
