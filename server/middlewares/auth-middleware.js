require("dotenv").config();
const jwt = require("jsonwebtoken");
const usersModel = require("../models/users");
const tokensModel = require("../models/tokens");
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
async function auth(req, res, next) {
  try {
    const authorization =
      req.headers.authorization || req.headers.Authorization;
    if (!authorization) {
      return res.json({
        success: false,
        error: true,
        message: "Unauthorized",
      });
    }
    const access_token = authorization.replace("Bearer ", "");
    const refresh_token = req.cookies.refresh_token;
    const active_refresh_token = await tokensModel.findOne({
      where: {
        refresh_token,
      },
    });
    if (!active_refresh_token) {
      const { email } = jwt.decode(refresh_token);
      const user = await usersModel.findOne({
        where: {
          email,
        },
      });
      const hackedUsers = await tokensModel.findAll({
        where: { userId: user.id },
      });
      hackedUsers.forEach(async (hackedUser) => {
        await hackedUser.destroy();
      });
      return res.clearCookie("refresh_token").json({
        success: false,
        error: true,
        message: "Unauthorized",
      });
    }
    const check = jwt.verify(access_token, access_token_secret);
    if (check) {
      const data = jwt.decode(access_token);
      const { email, firstName, lastName } = data;
      const payload = { email, firstName, lastName };
      const new_access_token = jwt.sign(payload, access_token_secret, {
        expiresIn: 1000 * 60,
      });
      const new_refresh_token = jwt.sign(payload, access_token_secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 365,
      });
      active_refresh_token.refresh_token = new_refresh_token;
      await active_refresh_token.save();
      const userData = { access_token: new_access_token, ...data };
      req.userData = userData;
      req.cookies.refresh_token = new_refresh_token;
      res.cookie("refresh_token", new_refresh_token, { httpOnly: true });
      next();
    } else {
      return res.json({
        success: false,
        error: true,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: true,
      message: "Unauthorized",
    });
  }
}

module.exports = auth;
