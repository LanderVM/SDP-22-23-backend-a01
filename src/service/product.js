const productRepository = require("../repository/product");
const ServiceError = require("../core/serviceError");

const getById = async (id) => {
  const product = await productRepository.getById(Number(id));
  if (!product[0]) {
    throw ServiceError.notFound(`There is no product with id ${id}`);
  }
  return {
    items: product,
    count: product.length,
  };
};

module.exports = {
  getById,
};
