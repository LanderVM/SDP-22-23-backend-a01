const { getKnex, tables } = require("../data/index");

const SELECT_COLUMNS = [
  `${tables.product}.product_id`, 'name', 'price', 'stock', 'description', 'photo', 'age'
]

const getAll = async () => {
  const products = await getKnex()(tables.product)
    .select("*")
  return products;
};

const getById = async (id) => {
  const product = await getKnex()(tables.product)
    .first(SELECT_COLUMNS)
    .where("product_id", id);
  return product;
};

module.exports = {
  getAll,
  getById,
};
