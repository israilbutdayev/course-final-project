require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

async function updateTokens(req, res, next) {
  try {
    if (!req.cookies["refresh_token"]) {
      next();
    }
    const authorization =
      req.headers?.authorization || req.headers?.Authorization;
    const access_token = authorization.replace("Bearer ", "");
    const { firstName, lastName, email } = jwt.decode(access_token);
    const user = await usersModel.findOne({
      where: {
        email,
      },
    });
    if (user) {
      const payload = { firstName, lastName, email };
      const new_access_token = jwt.sign(payload, access_token_secret, {
        expiresIn: 1000 * 60,
      });
      const new_refresh_token = jwt.sign(payload, refresh_token_secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 365,
      });
      user.refresh_token = new_refresh_token;
      await user.save();
      req.headers.authorization = "Bearer " + new_access_token;
      res.cookie("refresh_token", new_refresh_token, { httpOnly: true });
      next();
    } else {
      return res.json({
        success: true,
        error: false,
        message: "Token etibarsızdır.",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      error: true,
      message: "",
    });
  }
}

module.exports = updateTokens;
