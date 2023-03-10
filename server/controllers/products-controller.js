import { Op } from "sequelize";
import productsModel from "../models/products.js";
import usersModel from "../models/users.js";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL("..", import.meta.url));
const imagesPath = path.join(__dirname, "static", "images");
if (!fs.existsSync(imagesPath)) {
  fs.mkdirSync(imagesPath);
}

async function get(req, res) {
  if (req.method === "GET") {
    const params = req.params;
    if (JSON.stringify(params) === "{}") {
      const data = await productsModel.findAll();
      const products = data.map((p) => p);
      return res.json({ products });
    } else {
      const id = req.params?.id;
      const products = await productsModel.findAll({
        where: { id },
      });
      res.json({ products });
    }
  } else if (req.method === "POST") {
    const userData = req.userData;
    const { email } = userData;
    const user = await usersModel.findOne({
      where: {
        email,
      },
    });
    const products = await productsModel.findAll({
      where: {
        userId: user.id,
      },
    });
    res.json({ products });
  }
}

async function add(req, res) {
  const userData = req.userData;
  const { email } = userData;
  const user = await usersModel.findOne({
    where: {
      email,
    },
  });
  const fileTypes = { png: "png", jpeg: "jpg" };
  const data = req.body;
  const { imagesUrl, thumbnail } = data;
  const ext = thumbnail.match(/data\:image\/(png|jpeg)/)[1];
  const fileType = fileTypes[ext];
  const imageData = thumbnail.replace(/data\:image\/(png|jpeg);base64,/, "");
  const imageHash = crypto.randomBytes(20).toString("hex");
  const imageName = imageHash + "." + fileType;
  const imageFile = path.join(imagesPath, imageName);
  fs.writeFileSync(imageFile, imageData, "base64");
  const product = await productsModel.create({
    thumbnailUrl: imageName,
    imagesUrl: JSON.stringify(imagesUrl),
    ...data,
    price: Number(data.price),
    stock: Number(data.stock),
    userId: user.id,
  });
  await productsModel.sync();
  if (product) {
    res.json({
      success: true,
      error: false,
      message: "M??hsul u??urla yarad??ld??.",
    });
  } else {
    res.json({
      success: false,
      error: true,
      message: "X??ta ba?? verdi.",
    });
  }
}

async function remove(req, res) {
  try {
    const id = req.params.id;
    const userData = req.userData;
    const { email } = userData;
    const user = await usersModel.findOne({
      where: {
        email,
      },
    });
    const product = await productsModel.findOne({
      where: {
        id,
      },
    });
    if (product.userId === user.id) {
      const imagePath = product.thumbnailUrl;
      fs.unlinkSync(path.join(imagesPath, imagePath));
      await product.destroy();
      res.json({
        success: true,
        error: false,
        message: "M??hsul u??urla silindi",
      });
    } else {
      res.json({
        success: false,
        error: true,
        message: "M??hsul siz?? m??xsus deyil.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: true,
      message: error.msg,
    });
  }
}

export async function search(req, res) {
  const initialState = {
    title: "",
    brand: "",
    category: "",
    minPrice: 0,
    maxPrice: 999999,
    minStock: 0,
    maxStock: 999999,
  };
  const params = { ...initialState, ...req.body };
  const filter = {
    title: { [Op.substring]: params.title },
    brand: { [Op.substring]: params.brand },
    category: { [Op.substring]: params.category },
    price: { [Op.between]: [params.minPrice, params.maxPrice] },
    stock: { [Op.between]: [params.minStock, params.maxStock] },
  };
  const foundProducts = await productsModel.findAll({
    where: filter,
  });
  const products = foundProducts.map((product) => {
    const {
      dataValues: { createdAt, updatedAt, userId, ...value },
    } = product;
    return value;
  });
  res.json(products);
}

export { get, add, remove };
