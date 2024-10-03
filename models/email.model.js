const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    body: { type: String, required: true },
    recipient: { type: String, required: true },
    sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);
