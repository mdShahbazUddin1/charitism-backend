const express = require("express");
const { UserModel } = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth } = require("../middleware/auth");
const { BlackListModel } = require("../model/blacklist");
require("dotenv").config();
const userRoute = express.Router();

//create new user
userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    //checking user already present or not
    const isUserPresent = await UserModel.findOne({ email });
    //checking if user email already exist
    if (isUserPresent)
      return res.status(404).send({ msg: "Email Already Register" });
    //if email doesn't exist hasing the password
    const hasPassword = await bcrypt.hash(password, 10);
    //creating new user with hashed password
    const newUser = new UserModel({ name, email, password: hasPassword });
    await newUser.save();
    res.status(200).send({ msg: "Registration Successful" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

//login with existing user
userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    //checking user already present or not
    const isUserPresent = await UserModel.findOne({ email });
    //checking if user email doesn't exist
    if (!isUserPresent)
      return res.status(404).send({ msg: "Invalid email or password" });
    //verifying  register password with current password
    const verifyPassword = await bcrypt.compare(
      password,
      isUserPresent.password
    );
    // password is not matched
    if (!verifyPassword)
      return res.status(404).send({ msg: "Invalid email or password" });
    // if all ok generating jwt token
    const token = await jwt.sign(
      { userId: isUserPresent._id },
      process.env.accesstoken
    );
    // sending response
    res.status(200).send({ msg: "Login Successful", token });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

userRoute.get("/logout", auth, async (req, res) => {
  try {
    const token = req.headers?.authorization;
    if (!token) {
      return res.status(400).json({ msg: "Token is invalid or not provided" });
    }

    const blacklistToken = new BlackListModel({
      token: token,
    });

    await blacklistToken.save();

    res.status(200).json({ msg: "Logout success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  userRoute,
};
