const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model.js");
const productRoute = require("./routes/product.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/products", productRoute);


app.get("/", (req, res) => {
  res.send("Hello from Noode API Server Updated");
});


// mongoose.connect("mongodb+srv://haris2iftikhar:GClTzr15XhkjvN6k@backenddb.nrurtot.mongodb.net/Node-API?retryWrites=true&w=majority")
mongoose
  .connect(
    "mongodb+srv://fatyniang128:Mosh3tnk0mQPG7bv@backenddb.vw1d2.mongodb.net/Node-Crud-API?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3001, () => {
      console.log("Server is runing on port 3001");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
