const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  getMe,
} = require("../controllers/auth.controller");
const protectRoute = require("../middleware/protectedRoute");

// router.get("/", protectRoute, getMe);
router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);

module.exports = router;
