import { Op } from "sequelize";
import productsModel from "../models/products.js";
import usersModel from "../models/users.js";

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
  const data = req.body;
  const { imagesUrl } = data;
  const product = await productsModel.create({
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
      message: "Məhsul uğurla yaradıldı.",
    });
  } else {
    res.json({
      success: false,
      error: true,
      message: "Xəta baş verdi.",
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
      await product.destroy();
      await productsModel.sync();
      res.json({
        success: true,
        error: false,
        message: "Məhsul uğurla silindi",
      });
    } else {
      res.json({
        success: false,
        error: true,
        message: "Məhsul sizə məxsus deyil.",
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
  const params = req.body;
  if (params?.set) {
    const filter = {};
    Object.entries(params)
      .filter(([key, value]) => value !== "" && key !== "set")
      .forEach(([key, value]) => {
        filter[key] = { [Op.substring]: value };
      });
    const products = await productsModel.findAll({
      where: filter,
    });
    res.json(products);
  } else {
    const products = await productsModel.findAll({
      where: { title: { [Op.substring]: params.title } },
    });
    res.json(products);
  }
}

export { get, add, remove };
