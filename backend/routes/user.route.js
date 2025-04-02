const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  getUserFollow,
  getSuggestedUsers,
  followUnFollowUser,
  updateUser,
} = require("../controllers/user.controller");
const protectRoute = require("../middleware/protectedRoute");

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/follow", protectRoute, getUserFollow);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.post("/update", protectRoute, updateUser);

module.exports = router;
