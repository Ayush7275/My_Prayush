/*const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

// HOME ROUTE
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});*/
const connectDB = require("./backend/config/db");
const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();


const PORT = process.env.PORT || 3000;

// =====================================
// MIDDLEWARE
// =====================================

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/technologies", express.static(path.join(__dirname, "technologies")));


connectDB();

// =====================================
// ROUTES
// =====================================

const contactRoutes = require("./backend/routes/contactRoutes");
app.use("/api", contactRoutes);

// =====================================
// HOME ROUTE
// =====================================

app.get("/", (req, res) => {

  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// =====================================
// SERVER
// =====================================

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
});

const careerRoutes = require("./backend/routes/careerRoutes");
app.use("/api", careerRoutes);