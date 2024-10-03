const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /.+\@.+\..+/ 
    },
    password: { type: String, required: true },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

module.exports = mongoose.model("User", userSchema);
