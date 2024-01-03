const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user");
const { BlackListModel } = require("../model/blacklist");
require("dotenv").config();

const customMorgan = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res), // Log response time
    "ms",
  ].join(" ");
};

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    //checking token
    if (!token) return res.status(404).json({ msg: "token is not provided" });
    // comapring token
    const decodeToken = jwt.verify(token, process.env.accesstoken);
    // finding user
    const user = await UserModel.findOne({ _id: decodeToken.userId });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const blacklistToken = await BlackListModel.findOne({ token: token });

    if (blacklistToken) {
      return res.status(401).send({ msg: "login first" });
    }

    req.user = user;
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { auth, customMorgan };
