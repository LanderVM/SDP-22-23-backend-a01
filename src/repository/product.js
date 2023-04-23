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
const getFilteredProducts = async ({ startPrice, endPrice, inStock }) => {
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

const getByQuery = async (query) => {
  const result = await getKnex()(tables.product).where((builder) => {
    builder.whereBetween("price", [
      query.min_price ? query.min_price : 0,
      query.max_price ? query.max_price : 99999,
    ]);
    builder.where("stock", ">=", query.in_stock === true ? 1 : 0);
  });
  return result;
};

module.exports = {
  getAll,
  getById,
  getFilteredProducts,
  getByQuery,
};
