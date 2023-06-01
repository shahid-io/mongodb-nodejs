const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

// app.use(bodyparser.json());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Connected successfully");
});

//import routes
const productRoutes = require("./routes/product");

//route middleware
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("serving at port 3000....");
});
