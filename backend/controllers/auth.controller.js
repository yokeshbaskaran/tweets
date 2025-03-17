const User = require("../models/user");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const generateToken = require("../middleware/generateToken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
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
        .json({ error: "Password must contain atleast 6 characters" });
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const data = {
      username,
      email,
      password: hashedPassword,
    };

    const newUser = new User(data);
    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      console.log("user-", newUser);

      res.status(201).json(newUser);
    } else {
      return res.status(400).json({ error: "User cannot register" });
    }
  } catch (error) {
    console.log("Error in signup:", error.message);
    res.status(500).json({ error: "Tnternal Server Error" });
  }
};

const login = async (req, res) => {};
const getMe = async (req, res) => {};
const logout = async (req, res) => {};

module.exports = { signup, login, logout, getMe };
