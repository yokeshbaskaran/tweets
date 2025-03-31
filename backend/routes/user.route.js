const express = require("express");
const router = express.Router();

const {} = require("../controllers/auth.controller");
const protectRoute = require("../middleware/protectedRoute");

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, gets);
router.post("/follow/:id", protectRoute, followUnFollow);
router.post("/update", protectRoute, updateProfile);

module.exports = router;
