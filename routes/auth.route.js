const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/user.model.js");

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "User created", userId: user._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Connexion
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "votre_clé_secrète", { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mot de passe oublié
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    console.log("Email reçu pour réinitialisation :", email);

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Générer un jeton de réinitialisation
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 heure
        await user.save();

        // Configuration de Nodemailer
        const transporter = nodemailer.createTransport({
            service: "Gmail", // ou un autre service
            auth: {
                user: "votre_email@gmail.com",
                pass: "votre_mot_de_passe",
            },
        });

        // Envoi de l'e-mail
        const resetUrl = `http://localhost:3000/reset-password/${token}`;
        await transporter.sendMail({
            to: email,
            subject: "Réinitialisation de votre mot de passe",
            html: `<p>Veuillez cliquer sur le lien pour réinitialiser votre mot de passe: <a href="${resetUrl}">${resetUrl}</a></p>`,
        });

        res.status(200).json({ message: "Instructions envoyées" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Réinitialisation du mot de passe
router.post("/reset-password/:token", async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: "Mot de passe réinitialisé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
