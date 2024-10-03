const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    // Définis les champs selon tes besoins
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Form", formSchema);
