import productsModel from "../models/products.js";

async function get(req, res) {
  const params = req.params;
  if (JSON.stringify(params) === "{}") {
    const data = await productsModel.findAll();
    const products = data.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      thumbnailUrl: p.thumbnailUrl,
    }));
    return res.json({ products });
  } else {
    const id = req.params?.id;
    const products = await productsModel.findAll({
      where: { id },
    });
    res.json({ products });
  }
}

async function add(req, res) {
  const data = req.body;
  const { imagesUrl } = data;
  const product = await productsModel.create({
    imagesUrl: JSON.stringify(imagesUrl),
    ...data,
  });
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

export { get, add };
