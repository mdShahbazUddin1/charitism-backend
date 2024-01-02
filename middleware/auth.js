const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    //checking token
    if (!token) return res.status(404).json({ msg: "token is not provided" });
    // comapring token
    const decodeToken = jwt.verify(token, process.env.accessToken);
    // finding user
    const user = await UserModel.findOne({ _id: decodeToken.userId });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { auth };
