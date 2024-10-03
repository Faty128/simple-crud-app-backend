const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    price: { type: Number, required: true }, // Stocker le prix comme un nombre
    currency: { type: String, required: true, enum: ['XOF', 'USD', 'EUR'] }, // Limiter aux devises autorisées
    image: { type: String, required: true }, // Chemin vers l'image
    rating: { type: Number, min: 0, max: 5 } // Notation optionnelle
});

// Exporter le modèle
module.exports = mongoose.model("Hotel", hotelSchema);
