const express = require("express");
const cors = require("cors");
const connectDB = require("./backend/config/db");
const authRoutes = require("./backend/routes/auth");
const productRoutes = require("./backend/routes/products");
require("dotenv").config();

const app = express();

connectDB(); 

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
