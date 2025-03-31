const express = require("express");
const router = express.Router();

const {
  getNotifications,
  deleteNotifications,
} = require("../controllers/notification.controller");
const protectRoute = require("../middleware/protectedRoute");

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

module.exports = router;
