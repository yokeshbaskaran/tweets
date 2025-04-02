const express = require("express");
const router = express.Router();

const {
  createPost,
  deletePost,
  commentOnPost,
  likeUnlikePost,
  getAllPosts,
  getUserSinglePosts,
  getLikedPosts,
  getFollowingPosts,
  getUserPosts,
} = require("../controllers/post.controller");
const protectRoute = require("../middleware/protectedRoute");

router.get("/all", getAllPosts);
router.get("/following", protectRoute, getFollowingPosts);

router.get("/user/:username", protectRoute, getUserPosts);

router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);

router.get("/likes/:id", protectRoute, getLikedPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);

module.exports = router;
