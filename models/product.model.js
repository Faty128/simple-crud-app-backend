const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true, // Supprime les espaces autour du nom
    },
    email: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true, // Supprime les espaces autour du nom
    },
    password: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true, // Supprime les espaces autour du nom
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Quantity cannot be negative"], // Validation pour les quantités
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Price cannot be negative"], // Validation pour le prix
    },
    image: {
      type: String,
      required: false,
      default: "/routes/dashboard.route.js", // Valeur par défaut pour les images si non spécifiées
    },
  },
  {
    timestamps: true, // Ajoute les champs createdAt et updatedAt
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
