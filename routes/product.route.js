const express = require("express");
const router = express.Router();
const Product = require("../models/product.model.js");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

// Obtenir tous les produits
router.get("/", getProducts);

// Obtenir un produit par ID
router.get("/:id", getProduct);

// Créer un nouveau produit
router.post("/", createProduct);

// Mettre à jour un produit par ID
router.put("/:id", updateProduct);

// Supprimer un produit par ID
router.delete("/:id", deleteProduct); // Correction ici : utilisez .delete au lieu de .put

module.exports = router;
