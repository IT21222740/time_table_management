const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register a user
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password || !role) {
    res.status(400);
  }
  const userAvailable = await User.findOne({ email: email });
  if (userAvailable) {
    return res.status(400).json({ error: "User already registered!" });
  }
  //HashPassword
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hash Password", hashPassword);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
    role,
  });
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400).json("Invalid user data");
  }
});

//@desc Login a user
//@route Post /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: "All fields are mandatory" });
  }

  const user = await User.findOne({ email: email });
  //compare password with hashpassword
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401).json({ error: "Invalid email or password" });
  }
});

//@desc current userInfo
//@route Post /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
