const User = require("../models/user");
const jwt = require("jsonwebtoken");

const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log("token", token);

    if (!token)
      return res.status(401).json({ error: "You need to login first" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ error: "Unauthorised: Invalid token" });

    console.log("decoded", decoded);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found!" });
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = protectRoute;
