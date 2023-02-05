require("dotenv").config();
const usersModel = require("../models/users");
const tokensModel = require("../models/tokens");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

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
    const user = await usersModel.findOne({
      where: { email },
    });
    if (user) {
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const payload = { firstName, lastName, email };
        const access_token = jwt.sign(payload, access_token_secret, {
          expiresIn: 1000 * 60,
        });
        const refresh_token = jwt.sign(payload, refresh_token_secret, {
          expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
        const newToken = await tokensModel.create({
          refresh_token,
        });
        newToken.userId = user.id;
        await newToken.save();
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
          message: "Bu email artıq qeydiyyatdan keçib.",
        });
      }
    } else {
      const hash = bcrypt.hashSync(password, salt);
      const payload = { firstName, lastName, email };
      const access_token = jwt.sign(payload, access_token_secret, {
        expiresIn: 1000 * 60,
      });
      const refresh_token = jwt.sign(payload, refresh_token_secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 365,
      });
      const newUser = await usersModel.create({
        firstName,
        lastName,
        email,
        password: hash,
        refresh_token,
      });
      if (newUser) {
        const newToken = await tokensModel.create({
          refresh_token,
        });
        newToken.userId = newUser.id;
        await newToken.save();
        res.cookie("refresh_token", refresh_token, { httpOnly: true }).json({
          success: true,
          error: false,
          message: "Qeydiyyat uğurlu oldu",
          user: { firstName, lastName, email },
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
    const user = await usersModel.findOne({
      where: { email },
    });
    if (user) {
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        const { firstName, lastName } = user;
        const payload = { email, firstName, lastName };
        const access_token = jwt.sign(payload, access_token_secret, {
          expiresIn: 1000 * 60,
        });
        const refresh_token = jwt.sign(payload, access_token_secret, {
          expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
        const newToken = await tokensModel.create({
          refresh_token,
        });
        newToken.userId = user.id;
        await newToken.save();
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
  try {
    const { refresh_token } = req.cookies;
    const token = await tokensModel.findOne({
      where: {
        refresh_token,
      },
    });
    await token.destroy();
    res.clearCookie("refresh_token").json({
      success: true,
      error: false,
      message: "Sistemdən uğurla çıxıldı.",
    });
  } catch (error) {
    console.log(error);
    res.clearCookie("refresh_token").json({
      success: false,
      error: true,
      successMessage: "",
      errorMessage: "Token etibarsızdır.",
    });
  }
}

async function info(req, res) {
  const { email, access_token } = req.userData;
  const user = await usersModel.findOne({
    where: {
      email,
    },
  });
  const { firstName, lastName } = user;
  res.json({
    success: true,
    error: false,
    user: { firstName, lastName, email },
    access_token,
  });
}

async function refresh(req, res) {
  try {
    let refresh_token = req.cookies.refresh_token;
    const activeToken = await tokensModel.findOne({
      where: {
        refresh_token,
      },
    });
    if (!activeToken) {
      const { email } = jwt.decode(refresh_token);
      const user = await usersModel.findOne({
        where: {
          email,
        },
      });
      const hackedUsers = await tokensModel.findAll({
        where: { userId: user.id },
      });
      for (const hackedUser of hackedUsers) {
        await hackedUser.destroy();
      }
      return res.clearCookie("refresh_token").json({
        success: false,
        error: true,
        message: "Sistemə yenidən giriş etmək lazımdır.",
      });
    } else {
      const data = jwt.decode(refresh_token);
      const { email, firstName, lastName } = data;
      const payload = { firstName, lastName, email };
      const access_token = jwt.sign(payload, access_token_secret, {
        expiresIn: 1000 * 60,
      });
      const new_refresh_token = jwt.sign(payload, refresh_token_secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 365,
      });
      activeToken.refresh_token = new_refresh_token;
      await activeToken.save();
      res.cookie("refresh_token", new_refresh_token, { httpOnly: true }).json({
        success: true,
        error: false,
        successMessage: "Token uğurla yeniləndi.",
        errorMessage: "",
        access_token,
      });
    }
  } catch (error) {
    console.log(error);
    res.clearCookie("refresh_token").json({
      success: false,
      error: true,
      successMessage: "",
      errorMessage: "Token etibarsızdır.",
    });
  }
}

async function update(req, res) {
  try {
    const { email, access_token } = req.userData;
    const user = await usersModel.findOne({
      where: {
        email,
      },
    });
    const { email: newEmail } = req.body;
    if (email !== newEmail) {
      const usedEmail = await usersModel.findOne({
        where: {
          email: newEmail,
        },
      });
      if (usedEmail) {
        const { access_token } = req.userData;
        res.json({
          success: false,
          error: true,
          message: "Email artıq istifadə olunub.",
          access_token,
        });
      }
    }
    if (user) {
      const data = req.body;
      const password = data?.password;
      let checkPassword = bcrypt.compareSync(password, user.password);
      if (checkPassword) {
        if (data?.firstName) {
          user.firstName = data.firstName;
        }
        if (data?.lastName) {
          user.lastName = data.lastName;
        }
        if (data?.email) {
          user.email = data.email;
        }
        const newHash = bcrypt.hashSync(data.newPassword, salt);
        user.password = newHash;
        await user.save();
        const { firstName, lastName, email } = user;
        res.json({
          success: true,
          error: false,
          message: "Məlumatlar uğurla yeniləndi.",
          user: { firstName, lastName, email },
          access_token,
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
        message: "İstifadəçi tapılmadı.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: true,
      message: "",
    });
  }
}

module.exports = { registration, login, logout, info, refresh, update };
