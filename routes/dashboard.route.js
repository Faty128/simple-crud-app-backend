const express = require("express");
const User = require("../models/user.model.js");
const Form = require("../models/form.model.js");
const Message = require("../models/message.model.js");
const Hotel = require("../models/hotel.model.js");
const Email = require("../models/email.model.js");

const router = express.Router();

// Route pour obtenir les statistiques du tableau de bord
router.get("/stats", async (req, res) => {
    try {
        const stats = {
            forms: await Form.countDocuments(),
            messages: await Message.countDocuments(),
            users: await User.countDocuments(),
            hotels: await Hotel.countDocuments(),
            emails: await Email.countDocuments(),
        };

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
