const express = require("express");
const router = express.Router();

const {
  allUsers,
  getUserProfile,
  getUserFollow,
  removeFollower,

  getSuggestedUsers,
  followUnFollowUser,
  updateUser,
} = require("../controllers/user.controller");
const protectRoute = require("../middleware/protectedRoute");

router.get("/all", protectRoute, allUsers);
router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/follow", protectRoute, getUserFollow);
router.get("/suggested", protectRoute, getSuggestedUsers);

router.delete("/remove/:id", protectRoute, removeFollower);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.post("/update", protectRoute, updateUser);

module.exports = router;
