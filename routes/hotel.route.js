const express = require("express");
const router = express.Router();
const Hotel = require("../models/hotel.model.js"); // Importation du modèle Hotel
const multer = require('multer');
const path = require('path');

// Configurer multer pour stocker les fichiers
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les images seront sauvegardées
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Nom de fichier unique
    }
});

const upload = multer({ storage });

// Route pour obtenir tous les hôtels
router.get("/", async (req, res) => {
    try {
        const hotels = await Hotel.find({});
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route pour ajouter un nouvel hôtel
router.post("/", upload.single('image'), async (req, res) => { 
    console.log("Données reçues :", req.body); 
    console.log("Fichier reçu :", req.file); 
    const { name, location, email, phone, price, currency } = req.body;

    // Vérifie si les champs requis sont présents
    if (!name || !location || !email || !phone || !price || !currency || !req.file) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        const hotel = new Hotel({
            name,
            location,
            email,
            phone,
            price,
            currency,
            image: req.file.path, // Chemin vers l'image téléchargée
        });

        await hotel.save(); // Enregistrer l'hôtel dans la base de données
        res.status(201).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// D'autres routes pour mettre à jour et supprimer des hôtels peuvent suivre ici

module.exports = router;
