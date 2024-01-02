const express = require("express");
const { UserModel } = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserPresent = await UserModel.findOne({ email });

    if (isUserPresent)
      return res.status(404).send({ msg: "Email Already Register" });

    const hasPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hasPassword });
    await newUser.save();
    res.status(200).send({ msg: "Registration Successful" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUserPresent = await UserModel.findOne({ email });
    if (!isUserPresent)
      return res.status(404).send({ msg: "Invalid email or password" });

    const verifyPassword = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    if (!verifyPassword)
      return res.status(404).send({ msg: "Invalid email or password" });

    const token = await jwt.sign(
      { userId: isUserPresent._id },
      process.env.accesstoken
    );
    res.status(200).send({ msg: "Login Successful", token });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});
