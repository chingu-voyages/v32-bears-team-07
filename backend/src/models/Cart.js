const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    shipping: {
      type: Array,
    },
    digitalProduct: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
    },
    ownerId: {
      type: String,
      required: true,
    },
    customerId: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
