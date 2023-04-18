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

//-----TO DO------//
const getFilteredProducts = async ({ price, inStock }) => {
  let products;
  inStock
    ? (products = await getKnex()(tables.product)

        .whereBetween("price", [1, price])
        .whereNot("stock", 0))
    : (products = await getKnex()(tables.product)
        .select("*")
        .whereBetween("price", [1, price]));
  return products;
};

module.exports = {
  getAll,
  getById,
  getFilteredProducts,
};
