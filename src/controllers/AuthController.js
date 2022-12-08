const User = require("../models/User");
const Token = require("../models/RefreshToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

const AuthController = {
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).json("Wrong username");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(404).json("Wrong password");
      }
      if (user && password) {
        const accessToken = AuthController.generateAccessToken(user);
        const refreshToken = AuthController.generateRefreshToken(user);
        // refreshTokens.push(refreshToken);
        const token = new RefreshToken({
          _userId: user._id,
          token: refreshToken,
        });
        await token.save();
        // res.cookie("refreshToken", refreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        //   sameSite: "strict",
        // });
        const { pasword, ...others } = user._doc;
        return res.status(200).json({ ...others, accessToken, refreshToken });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  requestRefreshToken: (req, res) => {
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.body.refreshToken;
    // const refreshTokens = RefreshToken.find();
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated!");
    }
    if (!RefreshToken.find({ token: refreshToken })) {
      return res.status(403).json("Invalid Refresh Token");
    }
    jwt.verify(refreshToken, process.env.REFRESH_KEY, async (error, user) => {
      try {
        if (error) console.log(error);
        // refreshTokens = refreshTokens.filter(
        //   (token) => token !== req.cookies.refreshToken
        // );
        const resdel = await RefreshToken.findOneAndDelete({
          token: refreshToken,
        });
        const newAccessToken = AuthController.generateAccessToken(user);
        const newRefreshToken = AuthController.generateRefreshToken(user);
        const token = new RefreshToken({
          _userId: user.id,
          token: newRefreshToken,
        });
        await token.save();
        // res.cookie("refreshToken", newRefreshToken, {
        //   httpOnly: true,
        //   secure: false,
        //   path: "/",
        //   sameSite: "strict",
        // });
        return res
          .status(200)
          .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });
  },
  logoutUser: async (req, res) => {
    res.clearCookie("refreshToken");
    // refreshTokens.filter((token) => token !== req.cookies.refreshToken);
    // const refreshToken = req.cookies.refreshToken;
    const refreshToken = req.body.refreshToken;
    RefreshToken.findOneAndDelete({
      token: refreshToken,
    });
    return res.status(200).json("Logout succeeded");
  },
};

module.exports = AuthController;
