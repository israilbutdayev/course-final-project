import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

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
    const access_token = authorization.split(" ")[1];
    const check = jwt.verify(access_token, access_token_secret);
    if (check) {
      const data = jwt.decode(access_token);
      const userData = { access_token, ...data };
      req.userData = userData;
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

export default auth;
