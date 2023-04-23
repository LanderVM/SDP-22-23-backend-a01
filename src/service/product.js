
const getByQuery = async (query) => {
  const result = await productRepository.getByQuery(query);
  if (result.length === 0)
    throw ServiceError.notFound(`There were no products matching the query provided in details.`, {query});
  return result;
};

const productRepository = require("../repository/product");
const ServiceError = require("../core/serviceError");

const getAll = async () => {
  const products = await productRepository.getAll();
  if (!products) {
    throw ServiceError.notFound(`There are no products.`);
  }
  return {
    items: products,
    count: products.length,
  };
};

const getById = async (id) => {
  const product = await productRepository.getById(Number(id));
  if (!product) {
    throw ServiceError.notFound(`There is no product with id ${id}`);
  }
  return {
    items: product,
    count: product.length,
  };
};

const getFilteredProducts = async (price, inStock) => {
  const products = await productRepository.getFilteredProducts({
    price,
    inStock,
  });
  if (!products) {
    throw ServiceError.notFound(`There are no products with the given filter.`);
  }
  return {
    items: products,
    count: products.length,
  };
};

module.exports = {
  getAll,
  getById,
  getFilteredProducts,
  getByQuery
};
