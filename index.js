const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); 
const productRoute = require("./routes/product.route.js");
const authRoute = require("./routes/auth.route.js"); 
const dashboardRoute = require("./routes/dashboard.route.js"); 
const hotelRoute = require("./routes/hotel.route.js");


require('dotenv').config(); 

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));


// routes
app.use("/api/products", productRoute);
app.use("/api/auth", authRoute); 
app.use("/api/dashboard", dashboardRoute); 
app.use("/api/hotels", hotelRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT || 3001, () => {
      console.log(`Server is running on port ${process.env.PORT || 3001}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed!", error);
  });
