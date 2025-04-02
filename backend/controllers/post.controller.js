const Notification = require("../models/notification");
const User = require("../models/user");
const Post = require("../models/post.js");
const cloudinary = require("cloudinary").v2;

const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    console.log("text", text);

    // let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!text) {
      return res.status(400).json({ error: "Post must have text or" });
    }

    // if (!text && !img) {
    //   return res.status(400).json({ error: "Post must have text or image" });
    // }

    // if (img) {
    //   const uploadedResponse = await cloudinary.uploader.upload(img);
    //   img = uploadedResponse.secure_url;
    // }

    const newPost = new Post({
      user: userId,
      text,
      // img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createPost controller: ", error);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("post-id", id);

    const post = await Post.findById(id).populate("user", "-password");
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createPost controller: ", error);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    // if (post.img) {
    //   const imgId = post.img.split("/").pop().split(".")[0];
    //   await cloudinary.uploader.destroy(imgId);
    // }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { user: userId, text };

    post.comments.push(comment);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log("Error in commentOnPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const likeUnlikePost = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { id: postId } = req.params;

//     const post = await Post.findById(postId);

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     const userLikedPost = post.likes.includes(userId);

//     if (userLikedPost) {
//       // Unlike post
//       await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
//       await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

//       const updatedLikes = post.likes.filter(
//         (id) => id.toString() !== userId.toString()
//       );
//       res.status(200).json(updatedLikes);
//     } else {
//       // Like post
//       post.likes.push(userId);
//       await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
//       await post.save();

//       const notification = new Notification({
//         from: userId,
//         to: post.user,

//         type: "like",
//       });
//       await notification.save();

//       const updatedLikes = post.likes;
//       res.status(200).json(updatedLikes);
//     }
//   } catch (error) {
//     console.log("Error in likeUnlikePost controller: ", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const likeUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (post.likes.includes(userId)) {
      // Unlike the post
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      user.likedPosts = user.likedPosts.filter(
        (postId) => postId.toString() !== id
      );
    } else {
      // Like the post
      post.likes.push(userId);
      user.likedPosts.push(id);
    }

    await post.save();
    await user.save();

    const notification = new Notification({
      from: userId,
      to: post.user,
      type: "like",
    });
    await notification.save();

    return res.json(post.likes);
  } catch (error) {
    console.error("Error in likeUnlikePost", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (posts.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMyLikedPosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(likedPosts);
  } catch (error) {
    console.log("Error in getLikedPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;

    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(feedPosts);
  } catch (error) {
    console.log("Error in getFollowingPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//gets userpost by username
const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;
    // console.log("username", username);

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user?._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getUserPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getSinglePost,
  createPost,
  deletePost,
  commentOnPost,
  likeUnlikePost,
  getAllPosts,
  getUserPosts,

  getMyLikedPosts,
  getFollowingPosts,
};
