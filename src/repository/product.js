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

const getByName = async (name) => {
  const product = await getKnex()(tables.product).where("name", name).first();
  return product;
};

const getFilteredProducts = async (startPrice, endPrice, inStock, limit) => {
  const products = getKnex()(tables.product);
  if (inStock) {
    products.where("stock", ">", 0);
  } else {
    products.where("stock", "=", 0);
  }
  if (startPrice != null && endPrice != null) {
    products.whereBetween("price", [startPrice, endPrice]);
  }
  if (limit > 0) {
    products.limit(limit).offset(0);
  }
  return products;
};

module.exports = {
  getAll,
  getById,
  getByName,
  getFilteredProducts,
};
