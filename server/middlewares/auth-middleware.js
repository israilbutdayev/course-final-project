require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
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
    const check = jwt.verify(access_token, access_token_secret);
    if (check) {
      const data = jwt.decode(access_token);
      req.userData = data;
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
