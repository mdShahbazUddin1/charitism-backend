const express = require("express");
const { UserModel } = require("../model/user");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserPresent = await UserModel.findOne(email);

    if (isUserPresent)
      return res.status(404).send({ msg: "Email Already Register" });

    const newUser = new UserModel({ name, email, password });
    await newUser.save();
    res.status(200).send({ msg: "Registration Successful" });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});
