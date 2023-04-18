const { getKnex, tables } = require("../data/index");

const getAll = async () => {
  const products = await getKnex()(tables.product).select("*");
  return products;
};

const getById = async (id) => {
  const product = await getKnex()(tables.product)
    .first()
    .where("product_id", id);
  return product;
};

module.exports = {
  getAll,
  getById,
};
