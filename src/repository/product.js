const { getKnex, tables } = require("../data/index");

const getAll = async () => {
  const products = await getKnex()(tables.product);
  return products;
};

const getById = async (id) => {
  const product = await getKnex()(tables.product)
    .where("product_id", id)
    .first();
  return product;
};

const getFilteredProducts = async (startPrice, endPrice, inStock) => {
  const products = getKnex()(tables.product);
  if (inStock) {
    products.where("stock", ">", 0);
  } else {
    products.where("stock", "=", 0);
  }
  if (startPrice != null && endPrice != null) {
    products.whereBetween("price", [startPrice, endPrice]);
  }
  return products;
};

module.exports = {
  getAll,
  getById,
  getFilteredProducts,
};
