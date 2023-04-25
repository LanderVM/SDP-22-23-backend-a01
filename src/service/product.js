const productRepository = require("../repository/product");
const ServiceError = require("../core/serviceError");

const getAll = async () => {
  const products = await productRepository.getAll();
  /*if (!products) {
    throw ServiceError.notFound(`There are no products.`);
  }*/
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
    count: product.length || 1,
  };
};

const getByName = async (name) => {
  const product = await productRepository.getByName(name);
  if (!product) {
    throw ServiceError.notFound(`There is no product with name ${name}`);
  }
  return {
    items: product,
    count: product.length || 1,
  };
};

const getFilteredProducts = async ({
  startPrice = 0,
  endPrice = Number.MAX_SAFE_INTEGER,
  inStock = true,
}) => {
  const products = await productRepository.getFilteredProducts(
    Number(startPrice),
    Number(endPrice),
    Boolean(JSON.parse(inStock))
  );
  //Komt niet in
  /*if (!products) {
    throw ServiceError.notFound(`There are no products with the given filter.`);
  }*/
  return {
    items: products,
    count: products.length,
  };
};

module.exports = {
  getAll,
  getById,
  getByName,
  getFilteredProducts,
};
