const users = require("../models/users");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
SECRET_KEY = "apple";
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

async function registration(req, res) {
  const jsonData = req.body;
  if (
    ["firstName", "lastName", "email", "password"].some(
      (prop) => jsonData[prop] === ""
    )
  ) {
    return res.json({
      success: false,
      error: true,
      message: "Bütün xanalar daxil edilməyib.",
    });
  } else {
    const { firstName, lastName, email, password } = jsonData;
    const user = await users.findOne({
      where: { email },
    });
    if (user) {
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        res.json({
          success: true,
          error: false,
          message: "Sistemə uğurla daxil olundu.",
        });
      } else {
        res.json({
          success: false,
          error: true,
          message: "Bu email artıq qeydiyyatdan keçib.",
        });
      }
    } else {
      const hash = bcrypt.hashSync(password, salt);
      const payload = { firstName, lastName, email };
      const access_token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: 1000 * 60,
      });
      const refresh_token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: 1000 * 60 * 60 * 24 * 365,
      });
      const newUser = await users
        .create({
          firstName,
          lastName,
          email,
          password: hash,
          refresh_token,
        })
        .catch((err) =>
          res.json({
            success: false,
            error: true,
            message: err,
          })
        );
      if (newUser) {
        res.cookie("refresh_token", refresh_token, { httpOnly: true }).json({
          firstName,
          lastName,
          email,
          access_token,
        });
      }
    }
  }
}

async function login(req, res) {
  const jsonData = req.body;
  if (["email", "password"].some((prop) => jsonData[prop] === "")) {
    return res.json({
      success: false,
      error: true,
      message: "Bütün xanalar daxil edilməyib.",
    });
  } else {
    const { email, password } = jsonData;
    const user = await users.findOne({
      where: { email },
    });
    if (user) {
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const payload = { email };
        const access_token = jwt.sign(payload, SECRET_KEY, {
          expiresIn: 1000 * 60,
        });
        const refresh_token = jwt.sign(payload, SECRET_KEY, {
          expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
        user.refresh_token = refresh_token;
        const { firstName, lastName } = user;
        await user.save();
        res.cookie("refresh_token", refresh_token, { httpOnly: true }).json({
          success: true,
          error: false,
          message: "Sistemə uğurla daxil olundu.",
          access_token,
          user: { firstName, lastName, email },
        });
      } else {
        res.json({
          success: false,
          error: true,
          message: "Şifrə yanlışdır.",
        });
      }
    } else {
      res.json({
        success: false,
        error: true,
        message: "Bu email qeydiyyatdan keçməyib.",
      });
    }
  }
}

async function logout(req, res) {
  const refresh_token = req.cookies["refresh_token"];
  const user = await users.findOne({
    where: { refresh_token },
  });
  user.refresh_token = null;
  await user.save();
  res.cookie("refresh_token", "", { httpOnly: true, maxAge: 1 }).json({
    success: true,
    error: false,
    message: "Sistemdən uğurla çıxıldı.",
  });
}

module.exports = { registration, login, logout };
