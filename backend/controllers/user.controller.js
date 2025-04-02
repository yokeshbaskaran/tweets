const Notification = require("../models/notification");
const User = require("../models/user");

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  // console.log("username", username);
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ message: "user not found!" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUserFollow = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    // console.log("user-id", userId);

    const user = await User.findById({ _id: userId });
    if (!user) return res.status(404).json({ message: "Userid not found!" });

    const [followers, following] = await Promise.all([
      User.find({ _id: { $in: user.followers } }).select("-password"),
      User.find({ _id: { $in: user.following } }).select("-password"),
    ]);

    res.status(200).json({ followers, following });
  } catch (error) {
    console.log("Error in getUserFollow", error.message);
    res.status(500).json({ error: error.message });
  }
};

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    // console.log("ids", id, userId);

    const userToModify = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (id === userId)
      return res
        .status(404)
        .json({ message: "you can't follow/unfollow yourself" });

    if (!userToModify || !currentUser)
      return res.status(404).json({ message: "user not found!" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: userId } });

      await User.findByIdAndUpdate(userId, { $pull: { followers: id } });

      res.status(200).json({ message: "user unfollowed successfully" });
    } else {
      //follow user
      await User.findByIdAndUpdate(id, { $push: { followers: userId } });

      await User.findByIdAndUpdate(userId, { $push: { following: id } });

      //Notification
      const newNotify = new Notification({
        type: "follow",
        from: userId,
        to: userToModify._id,
      });

      await newNotify.save();
      res.status(200).json({ message: "user followed successfully" });
    }
  } catch (error) {
    console.log("Error in followUnFollowUser", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const userFollowedByMe = await User.findById(userId).select("following");
    // console.log("getsuggested", userFollowedByMe);

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      { $sample: { size: 10 } },
    ]);
    // console.log("suggested users", users);

    const filterUsers = users.filter(
      (user) => !userFollowedByMe.following.includes(user._id)
    );
    // console.log("filterUsers", filterUsers);

    const suggested = filterUsers
      .slice(0, 4)
      .sort((a, b) => b.createdAt - a.createdAt);
    suggested.forEach((user) => (user.password = null));
    // console.log("suggested", suggested);

    res.status(200).json(suggested);
  } catch (error) {
    console.log("Error in getSuggestedUsers", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();

    // password should be null in response
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserProfile,
  getUserFollow,
  getSuggestedUsers,
  followUnFollowUser,
  updateUser,
};
