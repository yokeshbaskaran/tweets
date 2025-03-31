const User = require("../models/user");

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  console.log("username", username);
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ message: "user not found!" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile", error.message);
    res.status(500).json({ error: error.message });
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
  } catch (error) {
    console.log("Error in followUnFollowUser", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserProfile, followUnFollowUser };
