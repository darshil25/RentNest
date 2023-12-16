require("dotenv").config();
const express = require("express");
// const router = require(router);
const cors = require("cors");
const helmet = require("helmet");
const { connectDB } = require("../config/db");
const adminRoutes = require("../routes/adminRoutes");
const userRoutes = require("../routes/userRoutes");


connectDB();
const app = express();

app.use(cors());
// We are using this for the express-rate-limit middleware
// See: https://github.com/nfriedly/express-rate-limit
// app.enable('trust proxy');
// app.set("trust proxy", 1);

app.use(express.json());
app.use(helmet());

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});

app.use(async (req, res, next) => {
  if (
    !!req.headers?.access_token &&
    req.headers?.access_token !== "undefined" &&
    req.headers?.access_token !== "null"
  ) {
    // Do general verification later (ban, admin, etc.)
  }
  next();
});



// this for route will need for store front, also for admin dashboard
app.use(`/api/admin/`, adminRoutes);
app.use("/api/user/", userRoutes);
// if you not use admin dashboard then these two route will not needed.

// Use express's default error handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});
const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`server running on port ${PORT}`));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
