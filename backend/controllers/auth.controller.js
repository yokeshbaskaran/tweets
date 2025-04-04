const User = require("../models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken");

const getMe = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");

  if (!user) res.status(404).json({ error: "User not found!" });
  res.status(200).json(user);
  try {
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.(com|org|net|edu|gov|io|tech|co\.uk|us)$/i;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUserEmail = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUserEmail) {
      const errMessage =
        existingUserEmail.username === username
          ? "Username is already taken"
          : "Email is already registered";
      return res.status(400).json({ error: errMessage });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json(newUser);
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPswd = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPswd) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);
    const { password: hashed, ...userData } = user._doc;
    res.status(200).json(userData);
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successful" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { signup, login, logout, getMe };
