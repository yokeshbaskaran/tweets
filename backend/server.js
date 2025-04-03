require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3005 || process.env.PORT;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const postRoutes = require("./routes/post.route");
const notificationRoutes = require("./routes/notifications.route");
const mongoose = require("mongoose");

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tweets-of-messages.onrender.com",
    ],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_DB_URL, {
    serverSelectionTimeoutMS: 50000, // 50 seconds
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("DB connection lost" + err.message);
  });

//routes

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// --------------------Deployment---------------

const path = require("path");
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

//--------------------Deployment---------------

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
