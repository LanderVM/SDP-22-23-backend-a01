const { getKnex, tables } = require("../data/index");

const getById = async (id) => {
  const product = await getKnex()(tables.product)
    .select("*")
    .where("product_id", id);
  return product;
};

module.exports = {
  getById,
};
